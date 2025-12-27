"use client";
import React, { Suspense, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { QueryParams } from "@/types";

import { ModalProvider, SharedProvider } from "@shared/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { VALID_FILTER_KEYS } from "@users/constants";
import { FavoritesProvider, FiltersProvider } from "@users/contexts";

const FiltersProviderWrapperContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const [initialFilters, setInitialFilters] = useState<QueryParams>({});

  useEffect(() => {
    // DOC Read filters from URL params on client side
    const filters: QueryParams = {};
    VALID_FILTER_KEYS.forEach((filterKey) => {
      const value = searchParams.get(filterKey);
      if (value) {
        filters[filterKey] = value;
      }
    });
    setInitialFilters(filters);
  }, [searchParams]);

  return (
    <FiltersProvider initialFilters={initialFilters}>
      {children}
    </FiltersProvider>
  );
};

const FiltersProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense
      fallback={
        <FiltersProvider initialFilters={{}}>{children}</FiltersProvider>
      }
    >
      <FiltersProviderWrapperContent>{children}</FiltersProviderWrapperContent>
    </Suspense>
  );
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SharedProvider>
        <ModalProvider>
          <FiltersProviderWrapper>
            <FavoritesProvider>{children}</FavoritesProvider>
          </FiltersProviderWrapper>
        </ModalProvider>
      </SharedProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
