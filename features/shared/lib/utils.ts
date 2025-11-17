import { DeviceType, PageConfig, PageParamsProps } from "@/types";
import { v4 } from "uuid";
import { PER_PAGE_CONFIGS } from "../constants";

export async function getPageConfig(
  pageParams: PageParamsProps
): Promise<PageConfig> {
  const queryParamsPromise = await pageParams.searchParams;

  const deviceType: DeviceType = queryParamsPromise.d || "desktop";
  // TODO Add parsing/validation for searchTerm
  const queryParams = queryParamsPromise;
  const perPageConfig = {
    ...PER_PAGE_CONFIGS[deviceType],
  };

  return { perPageConfig, queryParams };
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function getUniqueId() {
  return v4();
}
