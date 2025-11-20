"use client";
import { Params } from "@/types";
import { ValidFilterLabels } from "@/types/users";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { DEFAULT_FILTER_STATE } from "../lib/constants";
import { addFilterParamLabel, validateFilterParams } from "../lib/utils";

interface FiltersProviderProps {
  children: React.ReactNode;
}

interface FiltersContextProps {
  filters: Record<ValidFilterLabels, string | undefined>;
  updateFilters: (params: Params) => void;
  clearFilters: () => void;
}

export const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
);

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [filters, setFilters] =
    useState<Record<ValidFilterLabels, string | undefined>>(
      DEFAULT_FILTER_STATE
    );

  const updateFilters = useCallback((params: Params) => {
    // Add label to params and validate
    const validParamsWithLabel = addFilterParamLabel(params);

    if (validParamsWithLabel) {
      const validParams = validateFilterParams({
        [validParamsWithLabel.param]: validParamsWithLabel.value,
      });

      if (Object.keys(validParams).length > 0) {
        setFilters((prevParams) => ({
          ...prevParams,
          [validParamsWithLabel.label]: validParamsWithLabel.value,
        }));
      }
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER_STATE);
  }, []);

  const contextValue = useMemo(
    () => ({
      filters,
      updateFilters,
      clearFilters,
    }),
    [filters, updateFilters, clearFilters]
  );

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
