"use client";
import { useFiltersToUrl } from "@/features/shared/hooks";
import { getUniqueId } from "@/features/shared/lib/utils";
import { PageMessage } from "@/features/shared/ui";
import { useFiltersContext } from "@/features/users/contexts/FiltersContext";
import useInfiniteUsers from "@/features/users/queries";
import {
  Card,
  CardGrid,
  CardGridSkeleton,
  Filters,
  SearchInput,
} from "@/features/users/ui";
import { SearchPageProps } from "@/types";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./SearchPage.module.scss";

const { searchPage, searchPageAside, searchPageResults, searchPageSearch } =
  styles;

const SearchPage = ({ initialUsers, pageConfig }: SearchPageProps) => {
  // TODO fix page always shows scrollbar, when is not present it make the ui shuffley
  // TODO Add Hero section, then the scroll true on the router push in the hook should go to the search section, not to top of the page
  // TODO We should handle when the followers is set to an invalid value manually on the URL
  const { perPageConfig } = pageConfig;
  const { filters } = useFiltersContext();
  useFiltersToUrl(filters);

  const {
    users,
    isError,
    isLoading,
    isNoResults,
    isMore,
    totalCount,
    handleLoadMore,
  } = useInfiniteUsers(filters, perPageConfig.items, initialUsers);

  return (
    <div className={searchPage}>
      <div className={searchPageSearch}>
        <SearchInput />
      </div>
      <aside className={searchPageAside}>
        <Filters totalCount={totalCount} />
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
