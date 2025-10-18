"use client";
import { useIsFetching } from "@tanstack/react-query";
import { createContext, useEffect, useMemo, useState } from "react";

interface SharedProviderProps {
  children: React.ReactNode;
}

interface SharedContextProps {
  isClient: boolean;
  isLoading: boolean;
}

export const SharedContext = createContext<SharedContextProps>({
  isClient: false,
  isLoading: false,
});

export const SharedProvider = ({ children }: SharedProviderProps) => {
  const [isClient, setIsClient] = useState(false);
  const isLoading = useIsFetching() > 0;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const contextValue = useMemo(
    () => ({
      isClient,
      isLoading,
    }),
    [isClient, isLoading]
  );

  return (
    <SharedContext.Provider value={contextValue}>
      {children}
    </SharedContext.Provider>
  );
};
