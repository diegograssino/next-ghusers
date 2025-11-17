import SearchPage from "@/features/pages/SearchPage/SearchPage";
import { getPageConfig } from "@/features/shared/lib/utils";
import { DEFAULT_QUERY_PARAMS } from "@/features/users/lib/constants";
import { fetchUsersAction } from "@/features/users/server/actions";
import { PageParamsProps } from "@/types";

const Home = async (pageParams: PageParamsProps) => {
  // TODO GLOBAL implement react aria for accessibility
  const pageConfig = await getPageConfig(pageParams);

  const initialUsers = await fetchUsersAction({
    perPageParam: pageConfig.perPageConfig.items,
    pageParam: "0",
    queryParams: pageConfig.queryParams || DEFAULT_QUERY_PARAMS,
  });

  return <SearchPage initialUsers={initialUsers} pageConfig={pageConfig} />;
};

export default Home;
