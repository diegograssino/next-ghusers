import SearchPage from "@/features/pages/SearchPage/SearchPage";
import { getPageConfig } from "@/features/shared/lib/utils";
import { PageParamsProps } from "@/types";
import { fetchUsersAction } from "@users/actions";
import { INITIAL_PAGE_PARAM } from "@users/constants";
import { FiltersProvider } from "@users/contexts";

const Home = async (pageParams: PageParamsProps) => {
  const pageConfig = await getPageConfig(pageParams);

  const initialUsers = await fetchUsersAction({
    perPageParam: pageConfig.perPageConfig.items,
    pageParam: INITIAL_PAGE_PARAM,
    queryParams: pageConfig.initialFilters,
  });

  return (
    <FiltersProvider initialFilters={pageConfig.initialFilters}>
      <SearchPage initialUsers={initialUsers} pageConfig={pageConfig} />
    </FiltersProvider>
  );
};

export default Home;
