import { PER_PAGE_CONFIGS } from "@/features/shared/constants";
import { log } from "@/features/shared/lib/logger";
import { FilterParams, Params, QueryParams } from "@/types";
import {
  FetchUsersParams,
  ValidFilterKeys,
  ValidFilterParams,
} from "@/types/users";
import {
  DEFAULT_QUERY_PARAMS,
  VALID_FILTER_KEYS,
  VALID_FILTER_PARAMS,
  VALID_FOLLOWERS_VALUES,
} from "./constants";

export function getNonLoginFilters(
  filters: Record<string, string | undefined>
) {
  return Object.entries(filters)
    .filter(([key]) => key !== "login")
    .filter(([, value]) => value && value.trim() !== "");
}

export function validateFilterParams(
  params: Partial<QueryParams>
): ValidFilterParams {
  const validParams: ValidFilterParams = {};

  Object.keys(params).forEach((key) => {
    if (VALID_FILTER_KEYS.includes(key as ValidFilterKeys)) {
      validParams[key as ValidFilterKeys] = params[key];
    }
  });

  return validParams;
}

export function getFilterByLabel(label: string) {
  return VALID_FILTER_PARAMS.find((filter) => filter.label === label);
}

export function validateFollowersValue(value: string): boolean {
  return VALID_FOLLOWERS_VALUES.includes(
    value as (typeof VALID_FOLLOWERS_VALUES)[number]
  );
}

export function addFilterParamLabel(params: Params): FilterParams | undefined {
  const filterConfig = VALID_FILTER_PARAMS.find(
    (filter) => filter.param === params.param
  );

  if (filterConfig) {
    if (
      filterConfig.param === "followers" &&
      !validateFollowersValue(params.value)
    ) {
      return undefined;
    }

    return {
      param: params.param,
      value: params.value,
      label: filterConfig.label,
    };
  }

  return undefined;
}

export function handleFetchError(error: unknown, context: string): never {
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
}

export function parseNext(linkHeader: string): string | null {
  if (!linkHeader) return null;
  const links = linkHeader.split(",");

  for (const link of links) {
    const [urlPart, relPart] = link.split(";");
    const urlMatch = urlPart.match(/<([^>]+)>/);
    const relMatch = relPart?.match(/rel="([^"]+)"/);

    if (relMatch?.[1] === "next") {
      return urlMatch?.[1] ?? null;
    }
  }

  return null;
}

export function extractSince(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get("since");
  } catch {
    return null;
  }
}

export const getFetchOptions = (): RequestInit => {
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
      "Content-Type": "application/json",
      "User-Agent": "GitHub-Users-App",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    // TODO Add timeout to envs or constants file
    signal: AbortSignal.timeout(10000),
  };
};

export function getFetchUsersUrl(
  queryParams: QueryParams,
  isSearch: boolean,
  pageParam: string,
  perPageParam: string,
  page: string | number
): string {
  if (isSearch) {
    const queryParts = [];

    if ("followers" in queryParams && queryParams.followers) {
      queryParts.push(`followers:>${queryParams.followers}`);
    }

    if ("login" in queryParams && queryParams.login) {
      queryParts.push(`${queryParams.login}+in:login`);
    }

    const searchQuery = queryParts.join("+");
    return `https://api.github.com/search/users?q=${searchQuery}&page=${page}&per_page=${perPageParam}`;
  } else {
    return `https://api.github.com/users?since=${pageParam}&per_page=${perPageParam}`;
  }
}

export async function fetchUsers({
  queryParams = DEFAULT_QUERY_PARAMS,
  pageParam = "1",
  perPageParam = PER_PAGE_CONFIGS.desktop.items,
}: FetchUsersParams) {
  const fetchOptions = getFetchOptions();
  const isSearch = !!(
    (queryParams && "login" in queryParams && queryParams.login) ||
    (queryParams && "followers" in queryParams && queryParams.followers)
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
      const hasMore = data.items && data.items.length === Number(perPageParam);
      return {
        users: data.items || [],
        nextSince: hasMore ? String(Number(page) + 1) : null,
        totalCount: data.total_count || 0,
      };
    } else {
      const data = await res.json();
      const linkHeader = res.headers.get("Link") ?? "";
      const nextUrl = parseNext(linkHeader);
      const nextSince = nextUrl ? extractSince(nextUrl) : null;
      return {
        users: data || [],
        nextSince,
        totalCount: null,
      };
    }
  } catch (error) {
    return handleFetchError(error, "fetchUsers");
  }
}

export async function fetchUser(id: number) {
  const fetchOptions = getFetchOptions();

  try {
    const res = await fetch(`https://api.github.com/user/${id}`, fetchOptions);

    if (!res.ok) {
      const rateLimitRemaining = res.headers.get("x-ratelimit-remaining");
      const rateLimitReset = res.headers.get("x-ratelimit-reset");

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
      if (res.status === 403) {
        const isRateLimit =
          rateLimitRemaining === "0" ||
          errorMessage.toLowerCase().includes("rate limit");

        log.warn("GitHub API 403 error", {
          context: "fetchUser",
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
      (error.message.includes("rate limit") || error.message.includes("403"))
    ) {
      return null;
    }
    return handleFetchError(error, "fetchUser");
  }
}

export async function fetchUserRepos(id: number) {
  const fetchOptions = getFetchOptions();

  try {
    const res = await fetch(
      `https://api.github.com/user/${id}/repos`,
      fetchOptions
    );

    if (!res.ok) {
      const rateLimitRemaining = res.headers.get("x-ratelimit-remaining");
      const rateLimitReset = res.headers.get("x-ratelimit-reset");

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
      if (res.status === 403) {
        const isRateLimit =
          rateLimitRemaining === "0" ||
          errorMessage.toLowerCase().includes("rate limit");
        const fetchOptions = getFetchOptions();
        const hasToken = !!(
          fetchOptions.headers as HeadersInit & { Authorization?: string }
        )?.Authorization;

        log.warn("GitHub API 403 error", {
          context: "fetchUserRepos",
          status: res.status,
          statusText: res.statusText,
          errorMessage,
          rateLimitRemaining,
          rateLimitReset,
          isRateLimit,
          hasToken,
          url: `https://api.github.com/user/${id}/repos`,
        });

        return [];
      }

      throw new Error(`GitHub API error: ${res.status} ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("rate limit") || error.message.includes("403"))
    ) {
      return [];
    }
    return handleFetchError(error, "fetchUserRepos");
  }
}

export const formatFilterLabel = (
  filterKey: "login" | "followers",
  value: string
): string => {
  if (filterKey === "login") {
    return `"${value}" in username`;
  }
  if (filterKey === "followers") {
    return `>${value} followers`;
  }
  return value;
};
