"use server";
// TODO Verify error handling and logging

import { PER_PAGE_CONFIGS } from "@/features/shared/constants";
import { FetchUsersParams, FetchUsersResult } from "@/types/users";
import {
  extractSince,
  getServerFetchOptions,
  handleFetchError,
  parseNext,
} from "../lib/utils";

export async function fetchUsersAction({
  perPageParam = PER_PAGE_CONFIGS.desktop.items,
  pageParam = "1",
  queryParam = "",
}: FetchUsersParams): Promise<FetchUsersResult> {
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

  try {
    const res = await fetch(url, getServerFetchOptions());

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
    handleFetchError(error, "fetchUsersAction");
  }
}

export async function fetchUserAction(id: number) {
  try {
    const res = await fetch(
      `https://api.github.com/user/${id}`,
      getServerFetchOptions()
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    handleFetchError(error, "fetchUserAction");
  }
}
