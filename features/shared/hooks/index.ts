import { QueryParams } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export const useUrl = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrlFromFilters = useCallback(
    (filters: QueryParams) => {
      const params = new URLSearchParams(searchParams);

      // TODO Refactor this logic, not hardcoded params or better abstraction
      if (filters.login?.trim()) {
        params.set("login", filters.login.trim());
      } else {
        params.delete("login");
      }
      // TODO Refactor this logic, not hardcoded params or better abstraction
      if (filters.followers?.trim()) {
        params.set("followers", filters.followers.trim());
      } else {
        params.delete("followers");
      }

      const currentLoginQuery = searchParams.get("login") || "";
      const newLoginQuery = filters.login?.trim() || "";
      const currentFollowersQuery = searchParams.get("followers") || "";
      const newFollowersQuery = filters.followers?.trim() || "";

      if (
        currentLoginQuery !== newLoginQuery ||
        currentFollowersQuery !== newFollowersQuery
      ) {
        const newUrl = params.toString() ? `?${params.toString()}` : "/";
        router.replace(newUrl, { scroll: true });
      }
    },
    [router, searchParams]
  );

  const getFiltersFromUrl = useCallback(() => {
    return {
      login: searchParams.get("login") || "",
      followers: searchParams.get("followers") || "",
    };
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
