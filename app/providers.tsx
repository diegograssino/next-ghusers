"use client";
import { SharedProvider } from "@/features/shared/contexts/SharedContext";
import { FavsProvider } from "@/features/users/contexts/FavsContext";
import { FiltersProvider } from "@/features/users/contexts/FiltersContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SharedProvider>
        <FavsProvider>
          <FiltersProvider>{children}</FiltersProvider>
        </FavsProvider>
      </SharedProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
