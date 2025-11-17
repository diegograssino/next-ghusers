import { PER_PAGE_CONFIGS } from "@/features/shared/constants";
import { FetchUsersParams, FetchUsersResult, User } from "@/types";
import { DEFAULT_QUERY_PARAMS } from "../lib/constants";
import { fetchUser, fetchUsers } from "../lib/utils";

export const fetchUserService = async (id: number): Promise<User> => {
  return fetchUser(id);
};

export const fetchUsersService = async ({
  perPageParam = PER_PAGE_CONFIGS.desktop.items,
  pageParam = "1",
  queryParams = DEFAULT_QUERY_PARAMS,
}: FetchUsersParams): Promise<FetchUsersResult> => {
  return fetchUsers(queryParams, pageParam, perPageParam);
};
