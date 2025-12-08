"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { User } from "@/types";

import { fetchUserService } from "@users/services";

import { useSharedContext } from "../../shared/contexts/SharedContext";

interface FavoritesProviderProps {
  children: React.ReactNode;
}

interface FavoredUser {
  user: User;
  // DOC Unix timestamp in milliseconds
  timestamp: number;
}

interface FavoritesContextProps {
  favorites: FavoredUser[];
  addFavorite: (user: User) => Promise<void>;
  removeFavorite: (id: number) => void;
  checkFavorite: (id: number) => boolean;
  updateFavorite: (user: User) => void;
  isAddingFavorite: (id: number) => boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextProps | undefined
>(undefined);

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<FavoredUser[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [addingFavorites, setAddingFavorites] = useState<Set<number>>(
    new Set()
  );
  const { isClient } = useSharedContext();
  const favoritesRef = useRef<FavoredUser[]>([]);
  const addingFavoritesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    favoritesRef.current = favorites;
  }, [favorites]);

  useEffect(() => {
    addingFavoritesRef.current = addingFavorites;
  }, [addingFavorites]);

  useEffect(() => {
    if (isClient && typeof window !== "undefined" && window.localStorage) {
      try {
        const localFavorites = localStorage.getItem("favorites") || "[]";
        const parsedFavorites = JSON.parse(localFavorites);
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites as FavoredUser[]);
        } else {
          setFavorites([]);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
        setFavorites([]);
        setIsInitialized(true);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && isInitialized) {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
      }
    }
  }, [favorites, isClient, isInitialized]);

  const addFavorite = useCallback(async (user: User): Promise<void> => {
    const isAlreadyFavorite = favoritesRef.current.some(
      (fav) => fav.user.id === user.id
    );
    if (isAlreadyFavorite) {
      return;
    }

    if (addingFavoritesRef.current.has(user.id)) {
      // DOC Already being added
      return;
    }

    setAddingFavorites((current) => new Set(current).add(user.id));

    try {
      const completeUser = await fetchUserService(user.login);
      if (!completeUser) {
        throw new Error("User not found");
      }

      setFavorites((currentFavorites) => {
        // DOC Double-check it's not already added (race condition protection)
        if (!currentFavorites.some((fav) => fav.user.id === completeUser.id)) {
          return [
            ...currentFavorites,
            { user: completeUser, timestamp: Date.now() },
          ];
        }
        return currentFavorites;
      });
    } catch (error) {
      console.error("Error fetching complete user details:", error);
      throw error;
    } finally {
      setAddingFavorites((current) => {
        const next = new Set(current);
        next.delete(user.id);
        return next;
      });
    }
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((fav) => fav.user.id !== id)
    );
  }, []);

  const checkFavorite = useCallback(
    (id: number) => {
      return favorites.some((fav) => fav.user.id === id);
    },
    [favorites]
  );

  const updateFavorite = useCallback((user: User) => {
    setFavorites((currentFavorites) =>
      currentFavorites.map((fav) =>
        fav.user.id === user.id ? { user, timestamp: Date.now() } : fav
      )
    );
  }, []);

  const isAddingFavorite = useCallback(
    (id: number) => {
      return addingFavorites.has(id);
    },
    [addingFavorites]
  );

  const contextValue = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      checkFavorite,
      updateFavorite,
      isAddingFavorite,
    }),
    [
      favorites,
      addFavorite,
      removeFavorite,
      checkFavorite,
      updateFavorite,
      isAddingFavorite,
    ]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};
