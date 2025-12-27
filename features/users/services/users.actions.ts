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

export const fetchUserAction = async (login: string) => {
  const rawUser = await usersRepository.getUser(login);
  if (!rawUser) return null;
  return toUserAdapter(rawUser);
};

export const fetchUserReposAction = async (login: string): Promise<Repo[]> => {
  const rawRepos = await usersRepository.getUserRepos(login);
  return toReposAdapter(rawRepos);
};

export const fetchUserWithReposAction = async (
  login: string
): Promise<{ user: User | null; repos: Repo[] }> => {
  const [user, repos] = await Promise.all([
    fetchUserAction(login),
    fetchUserReposAction(login),
  ]);
  return { user, repos };
};
