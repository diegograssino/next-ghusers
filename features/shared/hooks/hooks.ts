import { useCallback, useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { QueryParams } from "@/types";

import { useSharedContext } from "@shared/contexts";
import { VALID_FILTER_KEYS } from "@users/constants";

export const useUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { navbarHeight, breadcrumbsHeight } = useSharedContext();

  const updateUrlFromFilters = useCallback(
    (filters: QueryParams, scrollTargetId?: string) => {
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

        router.replace(newUrl, { scroll: !scrollTargetId });

        if (scrollTargetId) {
          setTimeout(() => {
            const targetElement = document.getElementById(scrollTargetId);
            if (targetElement) {
              const offset = navbarHeight + breadcrumbsHeight;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - offset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }, 0);
        }
      }
    },
    [router, pathname, searchParams, navbarHeight, breadcrumbsHeight]
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

export const useFiltersToUrl = (
  filters: QueryParams,
  scrollTargetId?: string
) => {
  const { updateUrlFromFilters } = useUrl();

  useEffect(() => {
    updateUrlFromFilters(filters, scrollTargetId);
  }, [filters, scrollTargetId, updateUrlFromFilters]);
};
