"use client";
import { CardWidgetProps, User } from "@/types";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import styles from "./FavoritesWidget.module.scss";

const { favoritesWidgetEmptyStar, favoritesWidgetFilledStar } = styles;

interface FavoritesWidgetProps extends CardWidgetProps {
  user: User;
}

const FavoritesWidget = ({ id, user }: FavoritesWidgetProps) => {
  const {
    checkFavorite,
    addFavorite,
    removeFavorite,
    isAddingFavorite,
  } = useFavoritesContext();
  const [error, setError] = useState<string | null>(null);
  // DOC Simple boolean checks don't need memoization
  const isFavorite = checkFavorite(id);
  const isLoading = isAddingFavorite(id);

  // DOC No need to memoize handler passed to React built-in (button)
  const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);

    if (isFavorite) {
      removeFavorite(id);
    } else {
      try {
        await addFavorite(user);
      } catch (err) {
        console.error("Error adding favorite:", err);
        setError("Failed to add favorite. Please try again.");
      }
    }
  };

  return (
    <button
      onClick={handleFavorite}
      disabled={isLoading}
      data-testid="card-widget"
      title={
        error ||
        (isLoading
          ? "Adding..."
          : isFavorite
            ? "Remove favorite"
            : "Add favorite")
      }
    >
      {isLoading ? (
        <IconStar className={favoritesWidgetEmptyStar} />
      ) : !isFavorite ? (
        <IconStar className={favoritesWidgetEmptyStar} />
      ) : (
        <IconStarFilled className={favoritesWidgetFilledStar} />
      )}
    </button>
  );
};

export default FavoritesWidget;

