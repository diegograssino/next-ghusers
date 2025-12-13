import { useCallback, useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { scrollToElementWithOffset } from "@/features/shared/lib/utils";
import { QueryParams } from "@/types";

import { useSharedContext } from "@shared/contexts";
import { VALID_FILTER_KEYS } from "@users/constants";

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
        // DOC We scroll in useFiltersToUrl to ensure smooth scroll to top
        router.replace(newUrl, { scroll: false });
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

export const useFiltersToUrl = (
  filters: QueryParams,
  scrollTargetId?: string
) => {
  const { updateUrlFromFilters } = useUrl();
  const { navbarHeight, breadcrumbsHeight } = useSharedContext();
  const searchParams = useSearchParams();

  useEffect(() => {
    updateUrlFromFilters(filters);
  }, [filters, updateUrlFromFilters]);

  useEffect(() => {
    // DOC Don't scroll if search term is empty, if is not empty, we assume the user is searching for a new term and we should scroll to the top or the target (if passed).
    const searchTerm = filters.login?.trim() || "";
    if (!searchTerm) {
      return;
    }

    if (scrollTargetId) {
      const offset = navbarHeight + breadcrumbsHeight;
      scrollToElementWithOffset(scrollTargetId, offset);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [
    searchParams,
    scrollTargetId,
    navbarHeight,
    breadcrumbsHeight,
    filters.login,
  ]);
};

export {
  useModalBodyScrollLock,
  useModalFocus,
  useModalKeyboard,
} from "./useModalEffects";
