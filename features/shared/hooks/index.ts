import { DEFAULT_QUERY_PARAMS } from "@/features/users/lib/constants";
import { QueryParams } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export const useSearch = (
  queryParams: QueryParams = DEFAULT_QUERY_PARAMS,
  debounceMs = 1000
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialLoginTerm = queryParams.l || "";
  const initialFollowersTerm = queryParams.f || "";
  const [loginTerm, setLoginTerm] = useState(initialLoginTerm);
  const [followersTerm, setFollowersTerm] = useState(initialFollowersTerm);
  const [debouncedLoginTerm] = useDebounceValue(loginTerm, debounceMs);
  const [debouncedFollowersTerm] = useDebounceValue(followersTerm, debounceMs);
  // TODO Add parsing/validation for searchTerm
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Handle 'l' parameter (login search term) with debouncing
    if (debouncedLoginTerm.trim()) {
      params.set("l", debouncedLoginTerm.trim());
    } else {
      params.delete("l");
    }

    // Handle 'f' parameter (followers) with debouncing
    if (debouncedFollowersTerm.trim()) {
      params.set("f", debouncedFollowersTerm.trim());
    } else {
      params.delete("f");
    }

    const currentLoginQuery = searchParams.get("l") || "";
    const newLoginQuery = debouncedLoginTerm.trim();
    const currentFollowersQuery = searchParams.get("f") || "";
    const newFollowersQuery = debouncedFollowersTerm.trim();

    // Update URL if either parameter has changed
    if (
      currentLoginQuery !== newLoginQuery ||
      currentFollowersQuery !== newFollowersQuery
    ) {
      const newUrl = params.toString() ? `?${params.toString()}` : "/";
      router.replace(newUrl, { scroll: true });
    }
  }, [debouncedLoginTerm, debouncedFollowersTerm, router, searchParams]);

  const handleTerm = useCallback(
    (setter: (value: string) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
      },
    []
  );

  return {
    loginTerm: debouncedLoginTerm,
    followersTerm: debouncedFollowersTerm,
    loginInputValue: loginTerm,
    followersInputValue: followersTerm,
    handleLoginTermChange: handleTerm(setLoginTerm),
    handleFollowersChange: handleTerm(setFollowersTerm),
  };
};
