import SearchPage from "@/features/pages/SearchPage/SearchPage";
import { getPageConfig } from "@/features/shared/lib/utils";
import { fetchUsersAction } from "@/features/users/server/actions";
import { PageParamsProps } from "@/types";

const Home = async (pageParams: PageParamsProps) => {
  // TODO GLOBAL implement react aria for accessibility

  const pageConfig = await getPageConfig(pageParams);

  const initialUsers = await fetchUsersAction({
    perPageParam: pageConfig.perPageConfig.items,
    pageParam: "0",
    queryParam: pageConfig.searchTermParam || "",
  });

  return <SearchPage initialUsers={initialUsers} pageConfig={pageConfig} />;
};

export default Home;
