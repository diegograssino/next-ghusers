import FavsPage from "@/features/pages/FavsPage/FavsPage";
import { getPageConfig } from "@/features/shared/lib/utils";
import { FiltersProvider } from "@/features/users/contexts/FiltersContext";
import { PageParamsProps } from "@/types";

const Favs = async (pageParams: PageParamsProps) => {
  const pageConfig = await getPageConfig(pageParams);

  return (
    <FiltersProvider initialFilters={pageConfig.initialFilters}>
      <FavsPage pageConfig={pageConfig} />
    </FiltersProvider>
  );
};

export default Favs;
