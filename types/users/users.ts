import { QueryParams } from "../shared/shared";

export interface User {
  id: number;
  login: string;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  bio: null | string;
}

export interface Repo {
  name: string;
  htmlUrl: string;
}

export interface FetchUsersResult {
  users: User[];
  nextSince: string | null;
  totalCount: number | null;
}

export interface FetchUsersParams {
  perPageParam?: string;
  pageParam?: string;
  queryParams?: QueryParams;
}
