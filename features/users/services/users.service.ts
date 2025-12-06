"use client";

import { FetchUsersResult, QueryParams, User } from "@/types";
import { PER_PAGE_CONFIGS, STALE_TIME_ONE_MINUTE_MS } from "@shared/constants";
import { useSharedContext } from "@shared/contexts";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { toFetchUsersResultAdapter, toUserAdapter } from "@users/adapter";
import { usersRepository } from "@users/repository";
import { useEffect, useMemo } from "react";
import {
  DEFAULT_QUERY_PARAMS,
  FIRST_PAGE_PARAM,
  INITIAL_PAGE_PARAM,
  STALE_DATA_THRESHOLD,
} from "../lib/constants";

export const useInfiniteUsers = (
  queryParams: QueryParams = DEFAULT_QUERY_PARAMS,
  perPage = PER_PAGE_CONFIGS.desktop.items,
  initialData?: FetchUsersResult
) => {
  const { isClient } = useSharedContext();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["users", queryParams, perPage],
    queryFn: async ({
      pageParam = queryParams.login || queryParams.followers
        ? FIRST_PAGE_PARAM
        : INITIAL_PAGE_PARAM,
    }) => {
      const rawResponse = await usersRepository.getUsers({
        perPageParam: perPage,
        pageParam,
        queryParams,
      });

      return toFetchUsersResultAdapter(rawResponse);
    },
    initialPageParam:
      queryParams.login || queryParams.followers
        ? FIRST_PAGE_PARAM
        : INITIAL_PAGE_PARAM,
    getNextPageParam: (lastPage) => lastPage.nextSince,
    staleTime: STALE_TIME_ONE_MINUTE_MS,
    // DOC Only use initialData on first load server-side, not when query changes
    initialData:
      initialData && !isClient
        ? {
            pages: [initialData],
            pageParams: [
              queryParams.login || queryParams.followers ? "1" : "0",
            ],
          }
        : undefined,
  });
  // DOC No need to memoize: handleLoadMore is passed to InfiniteScroll (third-party component, not memoized)
  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const flattenedUsers = useMemo(() => {
    return data?.pages.map((page) => page.users).flat() || [];
  }, [data]);

  const isNoResults = flattenedUsers.length === 0 && !isFetching;
  const isLoading = isFetching && flattenedUsers.length === 0;
  const isMore = hasNextPage && !isFetching;
  const totalCount = data?.pages[0]?.totalCount || undefined;

  return {
    users: flattenedUsers,
    isError: error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isMore,
    isLoading,
    isNoResults,
    totalCount,
    handleLoadMore,
  };
};

interface FavoredUser {
  user: User;
  timestamp: number;
}

export const useInfiniteFavoriteUsers = (
  favorites: FavoredUser[],
  queryParams: QueryParams = DEFAULT_QUERY_PARAMS,
  updateFavorite?: (user: User) => void
) => {
  const hasNoFavorites = favorites.length === 0;

  const staleUsers = useMemo(() => {
    const now = Date.now();
    return favorites.filter(
      (fav) => now - fav.timestamp > STALE_DATA_THRESHOLD
    );
  }, [favorites]);

  const refreshQueries = useQueries({
    queries: staleUsers.map((fav) => ({
      queryKey: ["user", fav.user.id, "refresh"],
      queryFn: async () => {
        const rawUser = await usersRepository.getUser(fav.user.id);
        if (!rawUser) return null;
        return toUserAdapter(rawUser);
      },
      enabled: staleUsers.length > 0 && !!updateFavorite,
    })),
  });

  useEffect(() => {
    if (updateFavorite) {
      refreshQueries.forEach((query) => {
        if (query.data && !query.isLoading && !query.isError) {
          updateFavorite(query.data);
        }
      });
    }
  }, [refreshQueries, updateFavorite]);

  const isLoading = refreshQueries.some((q) => q.isLoading);
  const isError = refreshQueries.some((q) => q.isError);

  const filteredUsers = useMemo(() => {
    const loadedUsers = favorites.map((fav) => fav.user);

    if (!queryParams.login && !queryParams.followers) {
      return loadedUsers;
    }

    return loadedUsers.filter((user) => {
      if (queryParams.login && queryParams.login.trim()) {
        const loginMatch = user.login
          .toLowerCase()
          .includes(queryParams.login.trim().toLowerCase());
        if (!loginMatch) return false;
      }

      if (queryParams.followers && queryParams.followers.trim()) {
        const followersThreshold = parseInt(queryParams.followers, 10);
        if (
          !isNaN(followersThreshold) &&
          user.followers <= followersThreshold
        ) {
          return false;
        }
      }

      return true;
    });
  }, [favorites, queryParams.login, queryParams.followers]);

  const isNoResults =
    filteredUsers.length === 0 && !isLoading && !hasNoFavorites;
  const totalCount = filteredUsers.length;

  return {
    users: filteredUsers,
    isError,
    isLoading,
    isNoResults,
    totalCount,
    hasNoFavorites,
  };
};

export const fetchUserService = async (id: number): Promise<User | null> => {
  const rawUser = await usersRepository.getUser(id);
  if (!rawUser) return null;
  return toUserAdapter(rawUser);
};

export default useInfiniteUsers;
