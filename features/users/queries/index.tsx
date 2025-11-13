import { PER_PAGE_CONFIGS } from "@/features/shared/constants";
import { SharedContext } from "@/features/shared/contexts/SharedContext";
import { FetchUsersResult } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useContext, useMemo } from "react";
import { fetchUsers } from "../services";

export const useInfiniteUsers = (
  query = "",
  perPage = PER_PAGE_CONFIGS.desktop.items,
  initialData?: FetchUsersResult
) => {
  const { isClient } = useContext(SharedContext);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["users", query, perPage],
    queryFn: ({ pageParam = query ? "1" : "0" }) =>
      fetchUsers({
        perPageParam: perPage,
        pageParam,
        queryParam: query,
      }),
    initialPageParam: query ? "1" : "0",
    getNextPageParam: (lastPage) => lastPage.nextSince,
    staleTime: 1000 * 60,
    // Only use initialData on first load server-side, not when query changes
    initialData:
      initialData && !isClient
        ? {
            pages: [initialData],
            pageParams: [query ? "1" : "0"],
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
