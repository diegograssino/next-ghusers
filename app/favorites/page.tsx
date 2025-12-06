import FavoritesPage from "@/features/pages/FavoritesPage/FavoritesPage";
import { getPageConfig } from "@/features/shared/lib/utils";
import { PageParamsProps } from "@/types";
import { FiltersProvider } from "@users/contexts";

const Favorites = async (pageParams: PageParamsProps) => {
  const pageConfig = await getPageConfig(pageParams);

  return (
    <FiltersProvider initialFilters={pageConfig.initialFilters}>
      <FavoritesPage pageConfig={pageConfig} />
    </FiltersProvider>
  );
};

export default Favorites;

