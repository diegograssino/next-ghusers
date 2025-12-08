"use client";
import InfiniteScroll from "react-infinite-scroller";

import Link from "next/link";

import { getUniqueId } from "@/features/shared/lib/utils";
import heroImage from "@/public/assets/hero.png";
import { SearchPageProps } from "@/types";

import { ROUTES } from "@shared/constants";
import { useSharedContext } from "@shared/contexts";
import { useFiltersToUrl } from "@shared/hooks";
import { Button, Hero, PageMessage, Typography } from "@shared/ui";
import { useFiltersContext } from "@users/contexts";
import useInfiniteUsers from "@users/services";
import {
  Card,
  CardGrid,
  CardGridSkeleton,
  Filters,
  SearchInput,
} from "@users/ui";

import styles from "./SearchPage.module.scss";

const {
  searchPage,
  searchPageAside,
  searchPageResults,
  searchPageSearch,
  searchPageHeroContent,
} = styles;

const SearchPage = ({ initialUsers, pageConfig }: SearchPageProps) => {
  // TODO On infinite scroll loading state, we should show a skeleton, seems that is not being present now
  const { perPageConfig } = pageConfig;
  const { filters } = useFiltersContext();
  const { isLoadingUsers, viewportHeight } = useSharedContext();
  useFiltersToUrl(filters, "search-section");
  const { users, isError, isNoResults, isMore, totalCount, handleLoadMore } =
    useInfiniteUsers(filters, perPageConfig.items, initialUsers);

  return (
    <>
      <Hero alt="Discover GitHub Users" backgroundImage={heroImage}>
        <div className={searchPageHeroContent}>
          <Typography weight="bold" size="xl" as="h2" variant="primary" shadow>
            Discover GitHub Users
          </Typography>
          <Button
            as={Link}
            href={ROUTES.FAVORITES.href}
            variant="accent"
            size="lg"
          >
            <Typography variant="inverse" size="md">
              Go to Favorites
            </Typography>
          </Button>
        </div>
      </Hero>
      <div id="search-section" />
      <div className={searchPage}>
        <div className={searchPageSearch}>
          {/* TODO Search input should be in the header and open a palette style modal*/}
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
            // TODO Check if we can move to a self developed version as is a key dependency that could break everything if it fails, in the meantime we should wrap it on a component to an easy replacement
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
              threshold={viewportHeight}
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
