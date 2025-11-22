"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSharedContext } from "../../shared/contexts/SharedContext";

interface FavsProviderProps {
  children: React.ReactNode;
}

interface FavsContextProps {
  favs: number[];
  addFav: (id: number) => void;
  removeFav: (id: number) => void;
  checkFav: (id: number) => boolean;
}

export const FavsContext = createContext<FavsContextProps | undefined>(
  undefined
);

export const FavsProvider = ({ children }: FavsProviderProps) => {
  const [favs, setFavs] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isClient } = useSharedContext();

  // Load favs from localStorage on mount
  useEffect(() => {
    if (isClient && typeof window !== "undefined" && window.localStorage) {
      const localFavs = localStorage.getItem("favs") || "[]";
      setFavs(JSON.parse(localFavs));
      setIsInitialized(true);
    }
  }, [isClient]);

  // Save favs to localStorage when favs change (but only after initial load)
  useEffect(() => {
    if (isClient && isInitialized) {
      localStorage.setItem("favs", JSON.stringify(favs));
    }
  }, [favs, isClient, isInitialized]);

  const addFav = useCallback((id: number) => {
    setFavs((currentFavs) => {
      if (!currentFavs.some((fav) => fav === id)) {
        return [...currentFavs, id];
      }
      return currentFavs;
    });
  }, []);

  const removeFav = useCallback((id: number) => {
    setFavs((currentFavs) => currentFavs.filter((fav) => fav !== id));
  }, []);

  const checkFav = useCallback(
    (id: number) => {
      return favs.some((fav) => fav === id);
    },
    [favs]
  );

  const contextValue = useMemo(
    () => ({
      favs,
      addFav,
      removeFav,
      checkFav,
    }),
    [favs, addFav, removeFav, checkFav]
  );

  return (
    <FavsContext.Provider value={contextValue}>{children}</FavsContext.Provider>
  );
};

export const useFavsContext = () => {
  const context = useContext(FavsContext);
  if (context === undefined) {
    throw new Error("useFavsContext must be used within a FavsProvider");
  }
  return context;
};
