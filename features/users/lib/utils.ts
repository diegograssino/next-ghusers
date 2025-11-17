import { log } from "@/features/shared/lib/logger";

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
  queryParams: { l?: string },
  isSearch: boolean,
  pageParam: string,
  perPageParam: string,
  page: string | number
): string {
  const searchTermParam = queryParams.l || "";

  if (isSearch) {
    return `https://api.github.com/search/users?q=${encodeURIComponent(
      searchTermParam + " in:login"
    )}&page=${page}&per_page=${perPageParam}`;
  } else {
    return `https://api.github.com/users?since=${pageParam}&per_page=${perPageParam}`;
  }
}

export async function fetchUsers(
  queryParams: { l?: string },
  pageParam: string,
  perPageParam: string
) {
  const fetchOptions = getFetchOptions();
  const searchTermParam = queryParams.l || "";
  const isSearch = !!searchTermParam;
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
