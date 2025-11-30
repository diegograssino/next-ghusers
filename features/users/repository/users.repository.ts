import { log } from "@/features/shared/lib/logger";
import { QueryParams } from "@/types";
import { FetchUsersParams } from "@/types/users";
import { GitHubRepo, GitHubUser, GitHubUsersResponse } from "@/types/users/api";
import { FETCH_TIMEOUT_MS, PER_PAGE_CONFIGS } from "@shared/constants";
import {
  DEFAULT_QUERY_PARAMS,
  FIRST_PAGE_PARAM,
  GITHUB_API_AUTH_BEARER_PREFIX,
  GITHUB_API_BASE_URL,
  GITHUB_API_ERROR_RATE_LIMIT,
  GITHUB_API_FILTER_QUERY_FORMAT,
  GITHUB_API_HEADER_AUTHORIZATION,
  GITHUB_API_HEADER_CONTENT_TYPE,
  GITHUB_API_HEADER_CONTENT_TYPE_VALUE,
  GITHUB_API_HEADER_LINK,
  GITHUB_API_HEADER_RATE_LIMIT_REMAINING,
  GITHUB_API_HEADER_RATE_LIMIT_RESET,
  GITHUB_API_HEADER_USER_AGENT,
  GITHUB_API_HEADER_USER_AGENT_VALUE,
  GITHUB_API_LINK_PART_SEPARATOR,
  GITHUB_API_LINK_REL_NEXT,
  GITHUB_API_LINK_SEPARATOR,
  GITHUB_API_QUERY_JOINER,
  GITHUB_API_QUERY_PARAM_PAGE,
  GITHUB_API_QUERY_PARAM_PER_PAGE,
  GITHUB_API_QUERY_PARAM_Q,
  GITHUB_API_QUERY_PARAM_SINCE,
  GITHUB_API_RATE_LIMIT_ZERO,
  GITHUB_API_REPOS_ENDPOINT,
  GITHUB_API_SEARCH_USERS_ENDPOINT,
  GITHUB_API_STATUS_FORBIDDEN,
  GITHUB_API_USER_ENDPOINT,
  GITHUB_API_USERS_ENDPOINT,
  VALID_FILTER_KEYS,
} from "../lib/constants";

const handleFetchError = (error: unknown, context: string): never => {
  if (error instanceof Error) {
    log.error("Server error occurred", {
      context,
      errorName: error.name,
      message: error.message,
      stack: error.stack,
    });
  } else {
    log.error("Server error occurred", { context, error });
  }
  throw new Error("Server error occurred");
};

const parseNext = (linkHeader: string): string | null => {
  if (!linkHeader) return null;
  const links = linkHeader.split(GITHUB_API_LINK_SEPARATOR);

  for (const link of links) {
    const [urlPart, relPart] = link.split(GITHUB_API_LINK_PART_SEPARATOR);
    const urlMatch = urlPart.match(/<([^>]+)>/);
    const relMatch = relPart?.match(/rel="([^"]+)"/);

    if (relMatch?.[1] === GITHUB_API_LINK_REL_NEXT) {
      return urlMatch?.[1] ?? null;
    }
  }

  return null;
};

const extractSince = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get(GITHUB_API_QUERY_PARAM_SINCE);
  } catch {
    return null;
  }
};

const getFetchOptions = (): RequestInit => {
  const isServer = typeof window === "undefined";
  const token = isServer
    ? process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN
    : process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (isServer && process.env.NODE_ENV === "development") {
    log.debug("GitHub API token status", {
      hasToken: !!token,
      tokenLength: token?.length || 0,
      tokenPrefix: token?.substring(0, 4) || "none",
      //TODO Add an env helper to manage this things
      envVars: {
        hasGITHUB_TOKEN: !!process.env.GITHUB_TOKEN,
        hasNEXT_PUBLIC_GITHUB_TOKEN: !!process.env.NEXT_PUBLIC_GITHUB_TOKEN,
      },
    });
  }

  return {
    headers: {
      [GITHUB_API_HEADER_CONTENT_TYPE]: GITHUB_API_HEADER_CONTENT_TYPE_VALUE,
      [GITHUB_API_HEADER_USER_AGENT]: GITHUB_API_HEADER_USER_AGENT_VALUE,
      ...(token && {
        [GITHUB_API_HEADER_AUTHORIZATION]: `${GITHUB_API_AUTH_BEARER_PREFIX}${token}`,
      }),
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  };
};

const getFetchUsersUrl = (
  queryParams: QueryParams,
  isSearch: boolean,
  pageParam: string,
  perPageParam: string,
  page: string | number
): string => {
  if (isSearch) {
    const queryParts: string[] = [];

    VALID_FILTER_KEYS.forEach((filterKey) => {
      const filterValue = queryParams[filterKey]?.trim();
      if (filterValue) {
        const formatFunction = GITHUB_API_FILTER_QUERY_FORMAT[filterKey];
        if (formatFunction) {
          queryParts.push(formatFunction(filterValue));
        }
      }
    });

    const searchQuery = queryParts.join(GITHUB_API_QUERY_JOINER);
    return `${GITHUB_API_BASE_URL}${GITHUB_API_SEARCH_USERS_ENDPOINT}?${GITHUB_API_QUERY_PARAM_Q}=${searchQuery}&${GITHUB_API_QUERY_PARAM_PAGE}=${page}&${GITHUB_API_QUERY_PARAM_PER_PAGE}=${perPageParam}`;
  } else {
    return `${GITHUB_API_BASE_URL}${GITHUB_API_USERS_ENDPOINT}?${GITHUB_API_QUERY_PARAM_SINCE}=${pageParam}&${GITHUB_API_QUERY_PARAM_PER_PAGE}=${perPageParam}`;
  }
};

export const usersRepository = {
  getUsers: async ({
    queryParams = DEFAULT_QUERY_PARAMS,
    pageParam = FIRST_PAGE_PARAM,
    perPageParam = PER_PAGE_CONFIGS.desktop.items,
  }: FetchUsersParams): Promise<GitHubUsersResponse> => {
    const fetchOptions = getFetchOptions();
    const isSearch = !!(
      queryParams &&
      VALID_FILTER_KEYS.some((filterKey) => queryParams[filterKey]?.trim())
    );
    const page = isSearch
      ? Number(pageParam) < 1
        ? 1
        : Number(pageParam)
      : pageParam;
    const url = getFetchUsersUrl(
      queryParams,
      isSearch,
      pageParam,
      perPageParam,
      page
    );
    try {
      const res = await fetch(url, fetchOptions);

      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
      }

      if (isSearch) {
        const data = await res.json();
        const hasMore =
          data.items && data.items.length === Number(perPageParam);
        return {
          users: data.items || [],
          nextSince: hasMore ? String(Number(page) + 1) : null,
          totalCount: data.total_count || 0,
        };
      } else {
        const data = await res.json();
        const linkHeader = res.headers.get(GITHUB_API_HEADER_LINK) ?? "";
        const nextUrl = parseNext(linkHeader);
        const nextSince = nextUrl ? extractSince(nextUrl) : null;
        return {
          users: data || [],
          nextSince,
          totalCount: null,
        };
      }
    } catch (error) {
      return handleFetchError(error, "getUsers");
    }
  },

  getUser: async (id: number): Promise<GitHubUser | null> => {
    const fetchOptions = getFetchOptions();

    try {
      const res = await fetch(
        `${GITHUB_API_BASE_URL}${GITHUB_API_USER_ENDPOINT}/${id}`,
        fetchOptions
      );

      if (!res.ok) {
        const rateLimitRemaining = res.headers.get(
          GITHUB_API_HEADER_RATE_LIMIT_REMAINING
        );
        const rateLimitReset = res.headers.get(
          GITHUB_API_HEADER_RATE_LIMIT_RESET
        );

        let errorMessage = res.statusText;
        try {
          const errorBody = await res.json();
          if (errorBody.message) {
            errorMessage = errorBody.message;
          }
        } catch {
          // DOC Fallback to statusText if response isn't JSON
        }

        // DOC Handle 403 errors (could be rate limit, auth, or other)
        if (res.status === GITHUB_API_STATUS_FORBIDDEN) {
          const isRateLimit =
            rateLimitRemaining === GITHUB_API_RATE_LIMIT_ZERO ||
            errorMessage.toLowerCase().includes(GITHUB_API_ERROR_RATE_LIMIT);

          log.warn("GitHub API 403 error", {
            context: "getUser",
            status: res.status,
            statusText: res.statusText,
            errorMessage,
            rateLimitRemaining,
            rateLimitReset,
            isRateLimit,
          });

          return null;
        }

        throw new Error(`GitHub API error: ${res.status} ${errorMessage}`);
      }

      return await res.json();
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message.includes(GITHUB_API_ERROR_RATE_LIMIT) ||
          error.message.includes(String(GITHUB_API_STATUS_FORBIDDEN)))
      ) {
        return null;
      }
      return handleFetchError(error, "getUser");
    }
  },

  getUserRepos: async (id: number): Promise<GitHubRepo[]> => {
    const fetchOptions = getFetchOptions();

    try {
      const res = await fetch(
        `${GITHUB_API_BASE_URL}${GITHUB_API_USER_ENDPOINT}/${id}${GITHUB_API_REPOS_ENDPOINT}`,
        fetchOptions
      );

      if (!res.ok) {
        const rateLimitRemaining = res.headers.get(
          GITHUB_API_HEADER_RATE_LIMIT_REMAINING
        );
        const rateLimitReset = res.headers.get(
          GITHUB_API_HEADER_RATE_LIMIT_RESET
        );

        let errorMessage = res.statusText;
        try {
          const errorBody = await res.json();
          if (errorBody.message) {
            errorMessage = errorBody.message;
          }
        } catch {
          // DOC Fallback to statusText if response isn't JSON
        }

        // DOC Handle 403 errors (could be rate limit, auth, or other)
        if (res.status === GITHUB_API_STATUS_FORBIDDEN) {
          const isRateLimit =
            rateLimitRemaining === GITHUB_API_RATE_LIMIT_ZERO ||
            errorMessage.toLowerCase().includes(GITHUB_API_ERROR_RATE_LIMIT);
          const fetchOptions = getFetchOptions();
          const hasToken = !!(
            fetchOptions.headers as HeadersInit & { Authorization?: string }
          )?.Authorization;

          log.warn("GitHub API 403 error", {
            context: "getUserRepos",
            status: res.status,
            statusText: res.statusText,
            errorMessage,
            rateLimitRemaining,
            rateLimitReset,
            isRateLimit,
            hasToken,
            url: `${GITHUB_API_BASE_URL}${GITHUB_API_USER_ENDPOINT}/${id}${GITHUB_API_REPOS_ENDPOINT}`,
          });

          return [];
        }

        throw new Error(`GitHub API error: ${res.status} ${errorMessage}`);
      }

      return await res.json();
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message.includes(GITHUB_API_ERROR_RATE_LIMIT) ||
          error.message.includes(String(GITHUB_API_STATUS_FORBIDDEN)))
      ) {
        return [];
      }
      return handleFetchError(error, "getUserRepos");
    }
  },
};
