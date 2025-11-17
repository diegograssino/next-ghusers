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
    const params = new URLSearchParams(searchParams);

    if (debouncedSearchTerm.trim()) {
      params.set("l", debouncedSearchTerm.trim());
    } else {
      params.delete("l");
    }

    const currentQuery = searchParams.get("l") || "";
    const newQuery = debouncedSearchTerm.trim();

    if (currentQuery !== newQuery) {
      const newUrl = params.toString() ? `?${params.toString()}` : "/";
      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedSearchTerm, router, searchParams]);

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
