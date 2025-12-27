import HomePage from "@/features/pages/HomePage/HomePage";
import { getPageConfig } from "@/features/shared/lib/utils";
import { PageParamsProps } from "@/types";

import { fetchUsersAction } from "@users/actions";
import { INITIAL_PAGE_PARAM } from "@users/constants";

const Home = async (pageParams: PageParamsProps) => {
  const pageConfig = await getPageConfig(pageParams);

  const initialUsers = await fetchUsersAction({
    perPageParam: pageConfig.perPageConfig.items,
    pageParam: INITIAL_PAGE_PARAM,
    queryParams: pageConfig.initialFilters,
  });

  return <HomePage initialUsers={initialUsers} pageConfig={pageConfig} />;
};

export default Home;
