"use client";
import { Params, QueryParams } from "@/types";
import { ValidFilterLabels } from "@/types/users";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useDebounceValue } from "usehooks-ts";
import { DEFAULT_FILTER_STATE } from "../lib/constants";
import { addFilterParamLabel } from "../lib/utils";

interface FiltersProviderProps {
  children: React.ReactNode;
  initialFilters?: QueryParams;
}

interface FiltersContextProps {
  filters: Record<ValidFilterLabels, string | undefined>;
  updateFilters: (params: Params) => void;
  clearFilters: () => void;
  removeFilter: (filterLabel: ValidFilterLabels) => void;
  loginInputValue: string;
  followersInputValue: string;
}

export const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
);

export const FiltersProvider = ({
  children,
  initialFilters = {},
}: FiltersProviderProps) => {
  const convertedInitialFilters: Record<ValidFilterLabels, string | undefined> =
    {
      login: initialFilters.login || DEFAULT_FILTER_STATE.login,
      followers: initialFilters.followers || DEFAULT_FILTER_STATE.followers,
    };

  const [filters, setFilters] = useState<
    Record<ValidFilterLabels, string | undefined>
  >(convertedInitialFilters);

  const [debouncedFilters] = useDebounceValue(filters, 1000);

  const updateFilters = useCallback((params: Params) => {
    const filterConfig = addFilterParamLabel(params);

    if (filterConfig) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterConfig.label]: filterConfig.value,
      }));
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER_STATE);
  }, []);

  const removeFilter = useCallback((filterLabel: ValidFilterLabels) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterLabel]: "",
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      filters: debouncedFilters,
      updateFilters,
      clearFilters,
      removeFilter,
      loginInputValue: filters.login || "",
      followersInputValue: filters.followers || "",
    }),
    [debouncedFilters, updateFilters, clearFilters, removeFilter, filters]
  );

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }
  return context;
};
