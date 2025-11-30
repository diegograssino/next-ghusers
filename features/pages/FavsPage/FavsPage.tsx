"use client";
import { getUniqueId } from "@/features/shared/lib/utils";
import { FavsPageProps } from "@/types";
import { useFiltersToUrl } from "@shared/hooks";
import { PageMessage } from "@shared/ui";
import { useFavsContext, useFiltersContext } from "@users/contexts";
import { useInfiniteFavUsers } from "@users/services";
import { Card, CardGrid, Filters, SearchInput } from "@users/ui";
import styles from "./FavsPage.module.scss";

const { favsPage, favsPageAside, favsPageResults, favsPageSearch } = styles;

const FavsPage = ({ pageConfig }: FavsPageProps) => {
  // TODO UI should show clearly that is a favs page, not a search page, maybe it should be the dashboard and the search be below the user data, orders and controls
  const { favs, updateFav } = useFavsContext();
  const { filters } = useFiltersContext();
  useFiltersToUrl(filters);

  const { perPageConfig } = pageConfig;

  const { users, isError, isLoading, isNoResults, totalCount, hasNoFavs } =
    useInfiniteFavUsers(favs, filters, updateFav);

  if (isError) {
    return <PageMessage message="error" />;
  }

  if (isLoading) {
    return <PageMessage message="loading" />;
  }

  if (hasNoFavs) {
    return <PageMessage message="noResults" />;
  }

  return (
    <div className={favsPage}>
      <div className={favsPageSearch}>
        <SearchInput />
      </div>
      <aside className={favsPageAside}>
        <Filters totalCount={totalCount} />
      </aside>
      <div className={favsPageResults}>
        {isNoResults ? (
          <PageMessage message="noResults" />
        ) : (
          <CardGrid perPageConfig={perPageConfig}>
            {users.map((user) => (
              <Card key={getUniqueId()} user={user} />
            ))}
          </CardGrid>
        )}
      </div>
    </div>
  );
};

export default FavsPage;
