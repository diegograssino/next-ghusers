"use client";
import React from "react";

import { ModalProvider, SharedProvider } from "@shared/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FavoritesProvider } from "@users/contexts";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SharedProvider>
        <ModalProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </ModalProvider>
      </SharedProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
