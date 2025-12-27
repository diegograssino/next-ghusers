import FavoritesPage from "@/features/pages/FavoritesPage/FavoritesPage";
import { getPageConfig } from "@/features/shared/lib/utils";
import { PageParamsProps } from "@/types";

const Favorites = async (pageParams: PageParamsProps) => {
  const pageConfig = await getPageConfig(pageParams);

  return <FavoritesPage pageConfig={pageConfig} />;
};

export default Favorites;
