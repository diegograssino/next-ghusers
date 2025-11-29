import { VALID_FILTER_KEYS } from "@/features/users/lib/constants";
import { QueryParams } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export const useUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrlFromFilters = useCallback(
    (filters: QueryParams) => {
      const params = new URLSearchParams(searchParams);
      let hasChanges = false;

      VALID_FILTER_KEYS.forEach((filterKey) => {
        const filterValue = filters[filterKey]?.trim();
        const currentValue = searchParams.get(filterKey) || "";

        if (filterValue) {
          params.set(filterKey, filterValue);
        } else {
          params.delete(filterKey);
        }

        if (currentValue !== (filterValue || "")) {
          hasChanges = true;
        }
      });

      if (hasChanges) {
        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.replace(newUrl, { scroll: true });
      }
    },
    [router, pathname, searchParams]
  );

  const getFiltersFromUrl = useCallback(() => {
    const filters: QueryParams = {};

    VALID_FILTER_KEYS.forEach((filterKey) => {
      filters[filterKey] = searchParams.get(filterKey) || "";
    });

    return filters;
  }, [searchParams]);

  return {
    updateUrlFromFilters,
    getFiltersFromUrl,
  };
};

export const useFiltersToUrl = (filters: QueryParams) => {
  const { updateUrlFromFilters } = useUrl();

  useEffect(() => {
    updateUrlFromFilters(filters);
  }, [filters, updateUrlFromFilters]);
};
