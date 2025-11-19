"use server";
// TODO Verify error handling and logging

import { PER_PAGE_CONFIGS } from "@/features/shared/constants";
import { FetchUsersParams, FetchUsersResult } from "@/types/users";
import { DEFAULT_QUERY_PARAMS } from "../lib/constants";
import { fetchUser, fetchUserRepos, fetchUsers } from "../lib/utils";

export async function fetchUsersAction({
  perPageParam = PER_PAGE_CONFIGS.desktop.items,
  pageParam = "1",
  queryParams = DEFAULT_QUERY_PARAMS,
}: FetchUsersParams): Promise<FetchUsersResult> {
  return fetchUsers({ queryParams, pageParam, perPageParam });
}

export async function fetchUserAction(id: number) {
  return fetchUser(id);
}

export async function fetchUserReposAction(id: number) {
  return fetchUserRepos(id);
}
