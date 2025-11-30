import { FilterParams, Params } from "@/types";
import {
  FILTER_LABEL_FORMATTERS,
  VALID_FILTER_PARAMS,
  VALID_FOLLOWERS_VALUES,
} from "./constants";

export const getNonLoginFilters = (
  filters: Record<string, string | undefined>
) => {
  return Object.entries(filters)
    .filter(([key]) => key !== "login")
    .filter(([, value]) => value && value.trim() !== "");
};

export const validateFollowersValue = (value: string): boolean => {
  return VALID_FOLLOWERS_VALUES.includes(
    value as (typeof VALID_FOLLOWERS_VALUES)[number]
  );
};

export const addFilterParamLabel = (
  params: Params
): FilterParams | undefined => {
  const filterConfig = VALID_FILTER_PARAMS.find(
    (filter) => filter.param === params.param
  );

  if (filterConfig) {
    if (
      filterConfig.param === "followers" &&
      !validateFollowersValue(params.value)
    ) {
      return undefined;
    }

    return {
      param: params.param,
      value: params.value,
      label: filterConfig.label,
    };
  }

  return undefined;
};

export const formatFilterLabel = (
  filterKey: keyof typeof FILTER_LABEL_FORMATTERS,
  value: string
): string => {
  const formatter = FILTER_LABEL_FORMATTERS[filterKey];
  if (formatter) {
    return formatter(value);
  }
  return value;
};
