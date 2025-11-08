import { log } from "@/features/shared/lib/logger";
import { FetchUsersParams, FetchUsersResult, Repo, User } from "@/types";
import {
  extractSince,
  getClientFetchOptions,
  handleFetchError,
  parseNext,
} from "../lib/utils";
import { USERS_PER_PAGE_DEFAULT } from "../queries/constants";

export const fetchUser = async (id: number): Promise<User> => {
  log.info("Fetching user", { userId: id });
  try {
    const res = await fetch(
      `https://api.github.com/user/${id}`,
      getClientFetchOptions()
    );
    if (!res.ok) {
      log.warn("User fetch failed", {
        userId: id,
        status: res.status,
        statusText: res.statusText,
      });
      throw new Error(
        `Failed to fetch user ${id}: ${res.status} ${res.statusText}`
      );
    }
    log.info("User fetched successfully", { userId: id });
    return await res.json();
  } catch (error) {
    return handleFetchError(error, "fetchUser");
  }
};

export const fetchUserDetail = async (
  id: number
): Promise<{ user: User; repos: Repo[] }> => {
  log.info("Fetching user detail", { userId: id });
  try {
    const user = await fetchUser(id);
    const reposRes = await fetch(
      `https://api.github.com/user/${id}/repos`,
      getClientFetchOptions()
    );
    if (!reposRes.ok) {
      log.warn("User repos fetch failed", {
        userId: id,
        status: reposRes.status,
        statusText: reposRes.statusText,
      });
      throw new Error(
        `Failed to fetch repos ${id}: ${reposRes.status} ${reposRes.statusText}`
      );
    }
    const repos = await reposRes.json();
    log.info("User detail fetched successfully", {
      userId: id,
      reposCount: repos.length,
    });
    return { user, repos };
  } catch (error) {
    return handleFetchError(error, "fetchUserDetail");
  }
};

export const fetchUsers = async ({
  perPageParam = USERS_PER_PAGE_DEFAULT,
  pageParam = "1",
  queryParam = "",
}: FetchUsersParams): Promise<FetchUsersResult> => {
  const isSearch = !!queryParam;
  log.info("Fetching users", {
    isSearch,
    query: queryParam,
    page: pageParam,
    perPage: perPageParam,
  });
  try {
    let url: string;
    const page = isSearch
      ? Number(pageParam) < 1
        ? 1
        : Number(pageParam)
      : pageParam;

    if (isSearch) {
      url = `https://api.github.com/search/users?q=${encodeURIComponent(
        queryParam + " in:login"
      )}&page=${page}&per_page=${perPageParam}`;
    } else {
      url = `https://api.github.com/users?since=${pageParam}&per_page=${perPageParam}`;
    }

    const res = await fetch(url, getClientFetchOptions());

    if (!res.ok) {
      log.warn("Users fetch failed", {
        status: res.status,
        statusText: res.statusText,
        isSearch,
        query: queryParam,
      });
      throw new Error(`Error fetching users: ${res.status} ${res.statusText}`);
    }

    if (isSearch) {
      const data = await res.json();
      const hasMore = data.items && data.items.length === Number(perPageParam);
      const result = {
        users: data.items || [],
        nextSince: hasMore ? String(Number(page) + 1) : null,
        totalCount: data.total_count || 0,
      };
      log.info("Users search completed", {
        query: queryParam,
        resultsCount: result.users.length,
        totalCount: result.totalCount,
        hasMore,
      });
      return result;
    } else {
      const data = await res.json();
      const linkHeader = res.headers.get("Link") ?? "";
      const nextUrl = parseNext(linkHeader);
      const nextSince = nextUrl ? extractSince(nextUrl) : null;
      const result = {
        users: data || [],
        nextSince,
        totalCount: null,
      };
      log.info("Users list completed", {
        resultsCount: result.users.length,
        nextSince: result.nextSince,
      });
      return result;
    }
  } catch (error) {
    return handleFetchError(error, "fetchUsers");
  }
};
