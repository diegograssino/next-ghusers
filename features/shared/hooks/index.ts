import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export const useSearchTerm = (initialSearchTerm = "", debounceMs = 1000) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, debounceMs);
  // TODO Add parsing/validation for searchTerm

  useEffect(() => {
    if (initialSearchTerm && debouncedSearchTerm === initialSearchTerm) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (debouncedSearchTerm.trim()) {
      params.set("q", debouncedSearchTerm.trim());
    } else {
      params.delete("q");
    }

    const currentQuery = searchParams.get("q") || "";
    const newQuery = debouncedSearchTerm.trim();

    if (currentQuery !== newQuery) {
      const newUrl = params.toString() ? `?${params.toString()}` : "/";
      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedSearchTerm, router, searchParams, initialSearchTerm]);

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  return {
    searchTerm: debouncedSearchTerm,
    inputValue: searchTerm,
    handleSearchTermChange,
  };
};
