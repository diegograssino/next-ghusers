import { DeviceType, PageConfig, PageParamsProps } from "@/types";
import { PER_PAGE_CONFIGS } from "../constants";

export async function getPageConfig(
  pageParams: PageParamsProps
): Promise<PageConfig> {
  const searchParamsPromise = await pageParams.searchParams;

  const deviceType: DeviceType = searchParamsPromise.d || "desktop";
  // TODO Add parsing/validation for searchTerm
  const searchTermParam: string | undefined = searchParamsPromise.q;
  const perPageConfig = {
    ...PER_PAGE_CONFIGS[deviceType],
  };

  return { perPageConfig, searchTermParam };
}
