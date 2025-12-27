"use client";
import InfiniteScroll from "react-infinite-scroller";

import { getUniqueId } from "@/features/shared/lib/utils";
import { HomePageProps } from "@/types";

import { ROUTES, Z_INDEX_STICKY_CONTENT } from "@shared/constants";
import { useSharedContext } from "@shared/contexts";
import { useFiltersToUrl } from "@shared/hooks";
import { PageMessage } from "@shared/ui";
import { useFiltersContext } from "@users/contexts";
import useInfiniteUsers from "@users/services";
import { Card, CardGrid, CardGridSkeleton, Filters } from "@users/ui";

import styles from "./HomePage.module.scss";

const { homePage, homePageAside, homePageResults } = styles;

const HomePage = ({ initialUsers, pageConfig }: HomePageProps) => {
  // TODO On infinite scroll loading state, we should show a skeleton, seems that is not being present now
  // TODO On changing to another page, we should reset the filters, probably we should wrap the Link component to a custom one that resets the filters when clicked
  const { perPageConfig } = pageConfig;
  const { filters } = useFiltersContext();
  const { isLoadingUsers, viewportHeight } = useSharedContext();
  const { users, isError, isNoResults, isMore, totalCount, handleLoadMore } =
    useInfiniteUsers(filters, perPageConfig.items, initialUsers);
  useFiltersToUrl(filters, ROUTES.HOME.sectionId);

  return (
    <>
      <div id={ROUTES.HOME.sectionId} />
      <div className={homePage}>
        <aside
          className={homePageAside}
          style={{ zIndex: Z_INDEX_STICKY_CONTENT }}
        >
          <Filters totalCount={totalCount} />
        </aside>
        <div className={homePageResults}>
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
                {users.map((user, index) => (
                  <Card
                    key={getUniqueId()}
                    user={user}
                    priority={index < Number(perPageConfig.items)}
                  />
                ))}
              </CardGrid>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
