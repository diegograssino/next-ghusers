"use client";
import { useSearchTerm } from "@/features/shared/hooks";
import { getUniqueId } from "@/features/shared/lib/utils";
import { PageMessage } from "@/features/shared/ui";
import useInfiniteUsers from "@/features/users/queries";
import { Card, CardGrid, SearchInput } from "@/features/users/ui";
import { CardGridSkeleton } from "@/features/users/ui/CardGrid/CardGrid";
import SearchPageFilters from "@/features/users/ui/SearchPageFilters/Filters";
import { SearchPageProps } from "@/types";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./SearchPage.module.scss";

const { searchPage, searchPageAside, searchPageResults, searchPageSearch } =
  styles;

const SearchPage = ({ initialUsers, pageConfig }: SearchPageProps) => {
  // TODO scrollbar make the ui shuffley
  // TODO on changing search term the scroll should go to top
  // TODO Add Hero section
  const {
    perPageConfig,
    queryParams: { l: searchTermParam },
  } = pageConfig;
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
      <div className={searchPageSearch}>
        <SearchInput value={inputValue} onChange={handleSearchTermChange} />
      </div>
      <aside className={searchPageAside}>
        <SearchPageFilters totalCount={totalCount} />
      </aside>
      <div className={searchPageResults}>
        {isError ? (
          <PageMessage message="error" />
        ) : isLoading ? (
          <CardGridSkeleton perPageConfig={perPageConfig} />
        ) : isNoResults ? (
          <PageMessage message="noResults" />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={isMore}
            loader={
              <CardGridSkeleton
                perPageConfig={perPageConfig}
                key={getUniqueId()}
              />
            }
            //   TODO Check if we can detect the page height without killing the ssr to adjust the value as high as possible
            threshold={600}
          >
            <CardGrid perPageConfig={perPageConfig}>
              {users.map((user) => (
                <Card key={getUniqueId()} user={user} />
              ))}
            </CardGrid>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
