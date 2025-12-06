"use client";
import { SharedProvider } from "@shared/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FavoritesProvider } from "@users/contexts";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SharedProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </SharedProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
