"use server";
// TODO Verify error handling and logging

import { PER_PAGE_CONFIGS } from "@/features/shared/constants";
import { FetchUsersParams, FetchUsersResult } from "@/types/users";
import { DEFAULT_QUERY_PARAMS } from "../lib/constants";
import { fetchUser, fetchUserRepos, fetchUsers } from "../lib/utils";

export const fetchUsersAction = async ({
  perPageParam = PER_PAGE_CONFIGS.desktop.items,
  pageParam = "1",
  queryParams = DEFAULT_QUERY_PARAMS,
}: FetchUsersParams): Promise<FetchUsersResult> => {
  return fetchUsers({ queryParams, pageParam, perPageParam });
};

export const fetchUserAction = async (id: number) => {
  return fetchUser(id);
};

export const fetchUserReposAction = async (id: number) => {
  return fetchUserRepos(id);
};
