"use server";
// TODO Verify error handling and logging

import { FetchUsersParams, FetchUsersResult, Repo, User } from "@/types";

import { PER_PAGE_CONFIGS } from "@shared/constants";
import {
  toFetchUsersResultAdapter,
  toReposAdapter,
  toUserAdapter,
} from "@users/adapter";
import { usersRepository } from "@users/repository";

import { DEFAULT_QUERY_PARAMS, FIRST_PAGE_PARAM } from "../lib/constants";

export const fetchUsersAction = async ({
  perPageParam = PER_PAGE_CONFIGS.desktop.items,
  pageParam = FIRST_PAGE_PARAM,
  queryParams = DEFAULT_QUERY_PARAMS,
}: FetchUsersParams): Promise<FetchUsersResult> => {
  const rawResponse = await usersRepository.getUsers({
    perPageParam,
    pageParam,
    queryParams,
  });

  return toFetchUsersResultAdapter(rawResponse);
};

export const fetchUserAction = async (id: number) => {
  const rawUser = await usersRepository.getUser(id);
  if (!rawUser) return null;
  return toUserAdapter(rawUser);
};

export const fetchUserReposAction = async (id: number): Promise<Repo[]> => {
  const rawRepos = await usersRepository.getUserRepos(id);
  return toReposAdapter(rawRepos);
};

export const fetchUserWithReposAction = async (
  id: string | number
): Promise<{ user: User | null; repos: Repo[] }> => {
  const userId = Number(id);
  const [user, repos] = await Promise.all([
    fetchUserAction(userId),
    fetchUserReposAction(userId),
  ]);
  return { user, repos };
};
