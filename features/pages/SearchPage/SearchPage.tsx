"use client";
import { ROUTES } from "@/features/shared/constants";
import { useSharedContext } from "@/features/shared/contexts/SharedContext";
import { useFiltersToUrl } from "@/features/shared/hooks";
import { getUniqueId } from "@/features/shared/lib/utils";
import { Hero, PageMessage } from "@/features/shared/ui";
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
  // TODO On infinite scroll loading state, we should show a skeleton, seems that is not being present now
  const { perPageConfig } = pageConfig;
  const { filters } = useFiltersContext();
  const { isLoadingUsers } = useSharedContext();
  useFiltersToUrl(filters);
  const { users, isError, isNoResults, isMore, totalCount, handleLoadMore } =
    useInfiniteUsers(filters, perPageConfig.items, initialUsers);

  return (
    <>
      <Hero route={ROUTES.HOME} />
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
          ) : isLoadingUsers ? (
            <CardGridSkeleton perPageConfig={perPageConfig} />
          ) : isNoResults ? (
            <PageMessage message="noResults" />
          ) : (
            // TODO Check if we can move to a self developed version as is a key dependency that could break everything if it fails
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
              // TODO Check if we can detect the page height without killing the ssr to adjust the value as high as possible
              // TODO Check the best value for the threshold, 1000 seems to be a good value, but we should test it with different screen sizes, we can control the value via a config device value
              threshold={1000}
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
    </>
  );
};

export default SearchPage;
