import { PER_PAGE_CONFIGS } from "@/features/shared/constants";
import { useSharedContext } from "@/features/shared/contexts/SharedContext";
import { FetchUsersResult, QueryParams, User } from "@/types";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { DEFAULT_QUERY_PARAMS } from "../lib/constants";
import { fetchUserService, fetchUsersService } from "../services";

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
    queryFn: ({
      pageParam = queryParams.login || queryParams.followers ? "1" : "0",
    }) =>
      fetchUsersService({
        perPageParam: perPage,
        pageParam,
        queryParams,
      }),
    initialPageParam: queryParams.login || queryParams.followers ? "1" : "0",
    getNextPageParam: (lastPage) => lastPage.nextSince,
    staleTime: 1000 * 60,
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
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);
  const flattenedUsers = useMemo(() => {
    return data?.pages.map((page) => page.users).flat() || [];
  }, [data]);
  const isNoResults = useMemo(() => {
    return flattenedUsers.length === 0 && !isFetching;
  }, [flattenedUsers, isFetching]);
  const isLoading = useMemo(() => {
    return isFetching && flattenedUsers.length === 0;
  }, [isFetching, flattenedUsers]);
  const isMore = useMemo(() => {
    return hasNextPage && !isFetching;
  }, [hasNextPage, isFetching]);
  const totalCount = useMemo(() => {
    return data?.pages[0]?.totalCount || undefined;
  }, [data]);

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

// TODO this value should be a config value
const STALE_DATA_THRESHOLD = 24 * 60 * 60 * 1000;

export const useInfiniteFavUsers = (
  favs: FavoredUser[],
  queryParams: QueryParams = DEFAULT_QUERY_PARAMS,
  updateFav?: (user: User) => void
) => {
  const hasNoFavs = favs.length === 0;

  const staleUsers = useMemo(() => {
    const now = Date.now();
    return favs.filter((fav) => now - fav.timestamp > STALE_DATA_THRESHOLD);
  }, [favs]);

  const refreshQueries = useQueries({
    queries: staleUsers.map((fav) => ({
      queryKey: ["user", fav.user.id, "refresh"],
      queryFn: () => fetchUserService(fav.user.id),
      enabled: staleUsers.length > 0 && !!updateFav,
    })),
  });

  useEffect(() => {
    if (updateFav) {
      refreshQueries.forEach((query) => {
        if (query.data && !query.isLoading && !query.isError) {
          updateFav(query.data);
        }
      });
    }
  }, [refreshQueries, updateFav]);

  const isLoading = useMemo(() => {
    return refreshQueries.some((q) => q.isLoading);
  }, [refreshQueries]);

  const isError = useMemo(() => {
    return refreshQueries.some((q) => q.isError);
  }, [refreshQueries]);

  const filteredUsers = useMemo(() => {
    const loadedUsers = favs.map((fav) => fav.user);

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
  }, [favs, queryParams.login, queryParams.followers]);

  const isNoResults = useMemo(() => {
    return filteredUsers.length === 0 && !isLoading && !hasNoFavs;
  }, [filteredUsers, isLoading, hasNoFavs]);

  const totalCount = useMemo(() => {
    return filteredUsers.length;
  }, [filteredUsers]);

  return {
    users: filteredUsers,
    isError,
    isLoading,
    isNoResults,
    totalCount,
    hasNoFavs,
  };
};

export default useInfiniteUsers;
