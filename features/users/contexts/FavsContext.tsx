"use client";
import { User } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSharedContext } from "../../shared/contexts/SharedContext";
import { fetchUserService } from "../services";

interface FavsProviderProps {
  children: React.ReactNode;
}

interface FavoredUser {
  user: User;
  timestamp: number; // Unix timestamp in milliseconds
}

interface FavsContextProps {
  favs: FavoredUser[];
  addFav: (user: User) => Promise<void>;
  removeFav: (id: number) => void;
  checkFav: (id: number) => boolean;
  updateFav: (user: User) => void;
  isAddingFav: (id: number) => boolean;
}

export const FavsContext = createContext<FavsContextProps | undefined>(
  undefined
);

export const FavsProvider = ({ children }: FavsProviderProps) => {
  const [favs, setFavs] = useState<FavoredUser[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [addingFavs, setAddingFavs] = useState<Set<number>>(new Set());
  const { isClient } = useSharedContext();
  const favsRef = useRef<FavoredUser[]>([]);
  const addingFavsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    favsRef.current = favs;
  }, [favs]);

  useEffect(() => {
    addingFavsRef.current = addingFavs;
  }, [addingFavs]);

  useEffect(() => {
    if (isClient && typeof window !== "undefined" && window.localStorage) {
      try {
        const localFavs = localStorage.getItem("favs") || "[]";
        const parsedFavs = JSON.parse(localFavs);
        if (Array.isArray(parsedFavs)) {
          setFavs(parsedFavs as FavoredUser[]);
        } else {
          setFavs([]);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
        setFavs([]);
        setIsInitialized(true);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && isInitialized) {
      try {
        localStorage.setItem("favs", JSON.stringify(favs));
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
      }
    }
  }, [favs, isClient, isInitialized]);

  const addFav = useCallback(async (user: User): Promise<void> => {
    const isAlreadyFav = favsRef.current.some((fav) => fav.user.id === user.id);
    if (isAlreadyFav) {
      return;
    }

    if (addingFavsRef.current.has(user.id)) {
      return; // Already being added
    }

    setAddingFavs((current) => new Set(current).add(user.id));

    try {
      const completeUser = await fetchUserService(user.id);

      setFavs((currentFavs) => {
        // DOC Double-check it's not already added (race condition protection)
        if (!currentFavs.some((fav) => fav.user.id === completeUser.id)) {
          return [
            ...currentFavs,
            { user: completeUser, timestamp: Date.now() },
          ];
        }
        return currentFavs;
      });
    } catch (error) {
      console.error("Error fetching complete user details:", error);
      throw error;
    } finally {
      setAddingFavs((current) => {
        const next = new Set(current);
        next.delete(user.id);
        return next;
      });
    }
  }, []);

  const removeFav = useCallback((id: number) => {
    setFavs((currentFavs) => currentFavs.filter((fav) => fav.user.id !== id));
  }, []);

  const checkFav = useCallback(
    (id: number) => {
      return favs.some((fav) => fav.user.id === id);
    },
    [favs]
  );

  const updateFav = useCallback((user: User) => {
    setFavs((currentFavs) =>
      currentFavs.map((fav) =>
        fav.user.id === user.id ? { user, timestamp: Date.now() } : fav
      )
    );
  }, []);

  const isAddingFav = useCallback(
    (id: number) => {
      return addingFavs.has(id);
    },
    [addingFavs]
  );

  const contextValue = useMemo(
    () => ({
      favs,
      addFav,
      removeFav,
      checkFav,
      updateFav,
      isAddingFav,
    }),
    [favs, addFav, removeFav, checkFav, updateFav, isAddingFav]
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
