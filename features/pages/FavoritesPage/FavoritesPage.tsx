"use client";
import { getUniqueId } from "@/features/shared/lib/utils";
import { FavoritesPageProps } from "@/types";

import { Z_INDEX_STICKY_CONTENT } from "@shared/constants";
import { useFiltersToUrl } from "@shared/hooks";
import { PageMessage } from "@shared/ui";
import { useFavoritesContext, useFiltersContext } from "@users/contexts";
import { useInfiniteFavoriteUsers } from "@users/services";
import { Card, CardGrid, Filters } from "@users/ui";

import styles from "./FavoritesPage.module.scss";

const { favoritesPage, favoritesPageAside, favoritesPageResults } = styles;

const FavoritesPage = ({ pageConfig }: FavoritesPageProps) => {
  const { favorites, updateFavorite } = useFavoritesContext();
  const { filters } = useFiltersContext();
  useFiltersToUrl(filters);

  const { perPageConfig } = pageConfig;

  const { users, isError, isLoading, isNoResults, totalCount, hasNoFavorites } =
    useInfiniteFavoriteUsers(favorites, filters, updateFavorite);

  if (isError) {
    return <PageMessage message="error" />;
  }

  if (isLoading) {
    return <PageMessage message="loading" />;
  }

  if (hasNoFavorites) {
    return <PageMessage message="noResults" />;
  }

  return (
    <div className={favoritesPage}>
      <aside
        className={favoritesPageAside}
        style={{ zIndex: Z_INDEX_STICKY_CONTENT }}
      >
        <Filters totalCount={totalCount} />
      </aside>
      <div className={favoritesPageResults}>
        {isNoResults ? (
          <PageMessage message="noResults" />
        ) : (
          <CardGrid perPageConfig={perPageConfig}>
            {users.map((user, index) => (
              <Card
                key={getUniqueId()}
                user={user}
                priority={index < Number(perPageConfig.items)}
              />
            ))}
          </CardGrid>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
