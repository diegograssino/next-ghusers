"use client";
import { useSearchTerm } from "@/features/shared/hooks";
import { PageMessage } from "@/features/shared/ui";
import useInfiniteUsers from "@/features/users/queries";
import { Card, CardGrid, CardSkeleton, SearchInput } from "@/features/users/ui";
import { SearchPageProps } from "@/types";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./SearchPage.module.scss";

const {
  searchPage,
  searchPageAside,
  searchPageResults,
  searchPageInfo,
  searchPageSearch,
} = styles;

const SearchPage = ({ initialUsers, pageConfig }: SearchPageProps) => {
  // TODO scrollbar make the ui shuffley
  const { perPageConfig, searchTermParam } = pageConfig;
  const { searchTerm, inputValue, handleSearchTermChange } =
    useSearchTerm(searchTermParam);

  const {
    users,
    isError,
    isLoading,
    isNoResults,
    isMore,
    totalCount,
    handleLoadMore,
  } = useInfiniteUsers(searchTerm, perPageConfig.items, initialUsers);

  return (
    <div className={searchPage}>
      <div className={searchPageInfo}>
        {/* TODO Create info module, will have promotions or similar */}
      </div>
      <div className={searchPageSearch}>
        <SearchInput
          value={inputValue}
          totalCount={totalCount}
          onChange={handleSearchTermChange}
          autoFocus
          placeholder="Search users..."
        />
      </div>

      <aside className={searchPageAside}>{/* TODO filters */}</aside>
      <div className={searchPageResults}>
        {isError ? (
          <PageMessage message="error" />
        ) : isLoading ? (
          <CardGrid perPageConfig={perPageConfig}>
            {Array.from({ length: parseInt(perPageConfig.items) }).map(
              (_, i) => (
                <CardSkeleton key={`skeleton-${i}`} />
              )
            )}
          </CardGrid>
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
            <CardGrid perPageConfig={perPageConfig}>
              {users.map((user, i) => (
                <Card key={user.id ?? i} user={user} />
              ))}
            </CardGrid>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
