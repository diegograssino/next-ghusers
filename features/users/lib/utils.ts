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
    // Additional validation for followers filter
    if (filterConfig.param === "f" && !validateFollowersValue(params.value)) {
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
  // Auto-detect environment: server-side has process.env.GITHUB_TOKEN, client-side has NEXT_PUBLIC_GITHUB_TOKEN
  const isServer = typeof window === "undefined";
  const token = isServer
    ? process.env.GITHUB_TOKEN
    : process.env.NEXT_PUBLIC_GITHUB_TOKEN;

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

    if ("f" in queryParams && queryParams.f) {
      queryParts.push(`followers:>${queryParams.f}`);
    }

    if ("l" in queryParams && queryParams.l) {
      queryParts.push(`${queryParams.l}+in:login`);
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
    (queryParams && "l" in queryParams && queryParams.l) ||
    (queryParams && "f" in queryParams && queryParams.f)
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
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
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
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    return handleFetchError(error, "fetchUserRepos");
  }
}
