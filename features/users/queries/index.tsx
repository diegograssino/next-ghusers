import { PER_PAGE_CONFIGS } from "@/features/shared/constants";
import { useSharedContext } from "@/features/shared/contexts/SharedContext";
import { FetchUsersResult, QueryParams } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { DEFAULT_QUERY_PARAMS } from "../lib/constants";
import { fetchUsersService } from "../services";

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
    // Only use initialData on first load server-side, not when query changes
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

export default useInfiniteUsers;
