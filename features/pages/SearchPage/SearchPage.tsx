"use client";
import { useSearchTerm } from "@/features/shared/hooks";
import { PageMessage } from "@/features/shared/ui";
import useInfiniteUsers from "@/features/users/queries";
import { Card, CardGrid, SearchInput } from "@/features/users/ui";
import SearchResults from "@/features/users/ui/SearchResults/SearchResults";
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
  // TODO Implement proper skeletons instead of loading message
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
        <SearchResults totalCount={totalCount} />
      </div>
      <div className={searchPageSearch}>
        <SearchInput
          value={inputValue}
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
