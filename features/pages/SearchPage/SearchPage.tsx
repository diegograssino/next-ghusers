"use client";
import { useSearchTerm } from "@/features/shared/hooks";
import { PageMessage, Typography } from "@/features/ui";
import useInfiniteUsers from "@/features/users/queries";
import { Card, CardGrid, SearchInput } from "@/features/users/ui";
import { SearchPageProps } from "@/types";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./SearchPage.module.scss";

const { searchPage, searchPageAside, searchPageResults, searchPageInfo } =
  styles;

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
        {/* TODO Fix this UI and componentize */}
        {totalCount && (
          <Typography as="p">{`${totalCount} results`}</Typography>
        )}
      </div>
      <SearchInput
        value={inputValue}
        onChange={handleSearchTermChange}
        autoFocus
        placeholder="Search users..."
      />
      <aside className={searchPageAside}>{/* TODO filters */}</aside>
      <main className={searchPageResults}>
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
      </main>
    </div>
  );
};

export default SearchPage;
