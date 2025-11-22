"use client";
import { useIsFetching } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface SharedProviderProps {
  children: React.ReactNode;
}

interface SharedContextProps {
  isClient: boolean;
  isLoadingUsers: boolean;
}

export const SharedContext = createContext<SharedContextProps | undefined>(
  undefined
);

export const SharedProvider = ({ children }: SharedProviderProps) => {
  const [isClient, setIsClient] = useState(false);
  const isLoadingUsers =
    useIsFetching({
      queryKey: ["users"],
      exact: false,
      predicate: (query) => {
        // Only consider it loading if the query is in pending state (no data yet)
        return query.state.status === "pending";
      },
    }) > 0;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const contextValue = useMemo(
    () => ({
      isClient,
      isLoadingUsers,
    }),
    [isClient, isLoadingUsers]
  );

  return (
    <SharedContext.Provider value={contextValue}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  const context = useContext(SharedContext);
  if (context === undefined) {
    throw new Error("useSharedContext must be used within a SharedProvider");
  }
  return context;
};
