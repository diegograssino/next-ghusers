"use client";
import { getUniqueId } from "@/features/shared/lib/utils";
import heroImage from "@/public/assets/hero.png";
import { SearchPageProps } from "@/types";
import { useSharedContext } from "@shared/contexts";
import { useFiltersToUrl } from "@shared/hooks";
import { Hero, PageMessage, Typography } from "@shared/ui";
import { INTERSECTION_OBSERVER_THRESHOLD } from "@users/constants";
import { useFiltersContext } from "@users/contexts";
import useInfiniteUsers from "@users/services";
import {
  Card,
  CardGrid,
  CardGridSkeleton,
  Filters,
  SearchInput,
} from "@users/ui";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./SearchPage.module.scss";

const {
  searchPage,
  searchPageAside,
  searchPageResults,
  searchPageSearch,
  searchPageHeroContent,
} = styles;

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
      <Hero alt="Discover GitHub Users" backgroundImage={heroImage}>
        <div className={searchPageHeroContent}>
          <Typography weight="bold" size="xl" as="h2" variant="primary" shadow>
            Discover GitHub Users
          </Typography>
        </div>
        {/* TODO Add a button to go to the dashboard */}
        {/* <Button>Go to dashboard</Button> */}
      </Hero>
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
              // TODO Make threshold configurable by device type (currently using constant INTERSECTION_OBSERVER_THRESHOLD)
              threshold={INTERSECTION_OBSERVER_THRESHOLD}
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
