import {
  FetchUsersResult,
  GitHubRepo,
  GitHubUser,
  GitHubUsersResponse,
  Repo,
  User,
} from "@/types";

export const toUserAdapter = (apiUser: GitHubUser): User => {
  return {
    id: apiUser.id,
    login: apiUser.login,
    avatarUrl: apiUser.avatar_url,
    followers: apiUser.followers,
    following: apiUser.following,
    publicRepos: apiUser.public_repos,
    bio: apiUser.bio,
  };
};

export const toUsersAdapter = (apiUsers: GitHubUser[]): User[] => {
  return apiUsers.map(toUserAdapter);
};

export const toFetchUsersResultAdapter = (
  apiResponse: GitHubUsersResponse
): FetchUsersResult => {
  return {
    users: toUsersAdapter(apiResponse.users),
    nextSince: apiResponse.nextSince,
    totalCount: apiResponse.totalCount,
  };
};

export const toRepoAdapter = (apiRepo: GitHubRepo): Repo => {
  return {
    name: apiRepo.name,
    htmlUrl: apiRepo.html_url,
  };
};

export const toReposAdapter = (apiRepos: GitHubRepo[]): Repo[] => {
  return apiRepos.map(toRepoAdapter);
};
