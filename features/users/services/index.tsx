import { PER_PAGE_CONFIGS } from "@/features/shared/constants";
import { FetchUsersParams, FetchUsersResult, Repo, User } from "@/types";
import {
  extractSince,
  getClientFetchOptions,
  handleFetchError,
  parseNext,
} from "../lib/utils";

export const fetchUser = async (id: number): Promise<User> => {
  try {
    const res = await fetch(
      `https://api.github.com/user/${id}`,
      getClientFetchOptions()
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch user ${id}: ${res.status} ${res.statusText}`
      );
    }
    return await res.json();
  } catch (error) {
    return handleFetchError(error, "fetchUser");
  }
};

export const fetchUserDetail = async (
  id: number
): Promise<{ user: User; repos: Repo[] }> => {
  try {
    const user = await fetchUser(id);
    const reposRes = await fetch(
      `https://api.github.com/user/${id}/repos`,
      getClientFetchOptions()
    );
    if (!reposRes.ok) {
      throw new Error(
        `Failed to fetch repos ${id}: ${reposRes.status} ${reposRes.statusText}`
      );
    }
    const repos = await reposRes.json();
    return { user, repos };
  } catch (error) {
    return handleFetchError(error, "fetchUserDetail");
  }
};
// TODO Refactor to avoid code duplication with server action
export const fetchUsers = async ({
  perPageParam = PER_PAGE_CONFIGS.desktop.items,
  pageParam = "1",
  queryParam = "",
}: FetchUsersParams): Promise<FetchUsersResult> => {
  try {
    let url: string;
    const isSearch = !!queryParam;
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
      throw new Error(`Error fetching users: ${res.status} ${res.statusText}`);
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
};
