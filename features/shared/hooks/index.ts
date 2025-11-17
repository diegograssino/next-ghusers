import { DEFAULT_QUERY_PARAMS } from "@/features/users/lib/constants";
import { QueryParams } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export const useLoginTerm = (
  queryParams: QueryParams = DEFAULT_QUERY_PARAMS,
  debounceMs = 1000
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialLoginTerm = queryParams.l || "";
  const [loginTerm, setLoginTerm] = useState(initialLoginTerm);
  const [debouncedLoginTerm] = useDebounceValue(loginTerm, debounceMs);
  // TODO Add parsing/validation for searchTerm

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Handle 'l' parameter (search term) - always handle if queryParams is provided
    if (debouncedLoginTerm.trim()) {
      params.set("l", debouncedLoginTerm.trim());
    } else {
      params.delete("l");
    }

    const currentQuery = searchParams.get("l") || "";
    const newQuery = debouncedLoginTerm.trim();

    if (currentQuery !== newQuery) {
      const newUrl = params.toString() ? `?${params.toString()}` : "/";
      router.replace(newUrl, { scroll: true });
    }
  }, [debouncedLoginTerm, router, searchParams]);

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginTerm(e.target.value);
    },
    []
  );

  return {
    loginTerm: debouncedLoginTerm,
    inputValue: loginTerm,
    handleSearchTermChange,
  };
};
