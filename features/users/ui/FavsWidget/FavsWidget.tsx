"use client";
import { CardWidgetProps, User } from "@/types";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { useFavsContext } from "../../contexts/FavsContext";
import styles from "./FavsWidget.module.scss";

const { favsWidgetEmptyStar, favsWidgetFilledStar } = styles;

interface FavsWidgetProps extends CardWidgetProps {
  user: User;
}

const FavsWidget = ({ id, user }: FavsWidgetProps) => {
  const { checkFav, addFav, removeFav, isAddingFav } = useFavsContext();
  const [error, setError] = useState<string | null>(null);
  const isFav = useMemo(() => checkFav(id), [checkFav, id]);
  const isLoading = useMemo(() => isAddingFav(id), [isAddingFav, id]);

  const handleFav = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setError(null);

      if (isFav) {
        removeFav(id);
      } else {
        try {
          await addFav(user);
        } catch (err) {
          console.error("Error adding favorite:", err);
          setError("Failed to add favorite. Please try again.");
        }
      }
    },
    [isFav, addFav, removeFav, id, user]
  );

  return (
    <button
      onClick={handleFav}
      disabled={isLoading}
      data-testid="card-widget"
      title={
        error ||
        (isLoading ? "Adding..." : isFav ? "Remove favorite" : "Add favorite")
      }
    >
      {isLoading ? (
        <IconStar className={favsWidgetEmptyStar} />
      ) : !isFav ? (
        <IconStar className={favsWidgetEmptyStar} />
      ) : (
        <IconStarFilled className={favsWidgetFilledStar} />
      )}
    </button>
  );
};

export default FavsWidget;
