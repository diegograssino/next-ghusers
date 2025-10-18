"use client";
import { PageMessage } from "@/features/ui";
import useInfiniteUsers from "@/features/users/queries";
import { Card, CardGrid, SearchInput } from "@/features/users/ui";
import { HomePageProps } from "@/types";
import { useCallback, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useDebounceValue, useMediaQuery } from "usehooks-ts";

const HomePage = ({ initialUsers }: HomePageProps) => {
  // TODO Implement proper skeletons
  // TODO add aside with filters at the right, the grid is already adjusted to leave one space
  // TODO scrollbar make the ui shuffley

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounceValue(searchTerm, 1000);
  // TODO This useMediaQuery should be removed or moved to a proper place linked to the css breakpoints values, same with perPage logic
  const isMobile = useMediaQuery("(max-width: 30rem)");
  const isTablet = useMediaQuery("(max-width: 48rem)");
  const perPage = useMemo(() => {
    return isMobile ? "6" : isTablet ? "12" : "15";
  }, [isMobile, isTablet]);
  const { users, isError, isLoading, isNoResults, isMore, handleLoadMore } =
    useInfiniteUsers(debouncedSearch, perPage, initialUsers);
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  return (
    <>
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        autoFocus
        placeholder="Search users..."
      />
      {isError ? (
        <PageMessage message="error" />
      ) : isLoading ? (
        <PageMessage message="loading" />
      ) : isNoResults ? (
        <PageMessage message="noResults" />
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={isMore}
          //   TODO Check if we can detect the page height without killing the ssr to adjust the value as high as possible
          threshold={700}
        >
          <CardGrid>
            {users.map((user, i) => (
              <Card key={user.id ?? i} user={user} />
            ))}
          </CardGrid>
        </InfiniteScroll>
      )}
    </>
  );
};

export default HomePage;
