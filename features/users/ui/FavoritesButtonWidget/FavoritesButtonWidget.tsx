"use client";
import { useState } from "react";

import { CardWidgetProps, User } from "@/types";

import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useFavoritesContext } from "@users/contexts";

import styles from "./FavoritesButtonWidget.module.scss";

const { favoritesButtonWidgetEmptyStar, favoritesButtonWidgetFilledStar } =
  styles;

interface FavoritesButtonWidgetProps extends CardWidgetProps {
  user: User;
}

const FavoritesButtonWidget = ({ id, user }: FavoritesButtonWidgetProps) => {
  const { checkFavorite, addFavorite, removeFavorite, isAddingFavorite } =
    useFavoritesContext();
  const [error, setError] = useState<string | null>(null);
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

  const ariaLabel =
    error ||
    (isLoading
      ? "Adding to favorites..."
      : isFavorite
        ? `Remove ${user.login} from favorites`
        : `Add ${user.login} to favorites`);

  return (
    <button
      onClick={handleFavorite}
      disabled={isLoading}
      data-testid="card-widget"
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {isLoading ? (
        <IconStar className={favoritesButtonWidgetEmptyStar} />
      ) : !isFavorite ? (
        <IconStar className={favoritesButtonWidgetEmptyStar} />
      ) : (
        <IconStarFilled className={favoritesButtonWidgetFilledStar} />
      )}
    </button>
  );
};

export default FavoritesButtonWidget;
