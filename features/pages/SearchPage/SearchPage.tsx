"use client";
import { useSearch } from "@/features/shared/hooks";
import { getUniqueId } from "@/features/shared/lib/utils";
import { PageMessage } from "@/features/shared/ui";
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
  const { perPageConfig, queryParams } = pageConfig;
  // TODO This hook should be per input to avoid unnecesary re renders, not all in one
  const {
    loginInputValue,
    handleLoginTermChange,
    followersInputValue,
    handleFollowersChange,
  } = useSearch(queryParams);

  const {
    users,
    isError,
    isLoading,
    isNoResults,
    isMore,
    totalCount,
    handleLoadMore,
  } = useInfiniteUsers(queryParams, perPageConfig.items, initialUsers);

  return (
    <div className={searchPage}>
      <div className={searchPageSearch}>
        <SearchInput value={loginInputValue} onChange={handleLoginTermChange} />
      </div>
      <aside className={searchPageAside}>
        <Filters
          totalCount={totalCount}
          followersInputValue={followersInputValue}
          onFollowersChange={handleFollowersChange}
        />
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
