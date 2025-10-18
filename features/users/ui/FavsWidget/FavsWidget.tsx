"use client";
import { CardWidgetProps } from "@/types";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import clsx from "clsx";
import { useCallback, useContext, useMemo } from "react";
import { FavsContext } from "../../contexts/FavsContext";
import styles from "./FavsWidget.module.scss";

const { FavsWidgetEmptyStar, FavsWidgetFilledStar } = styles;

const FavsWidget = ({ id }: CardWidgetProps) => {
  const { checkFav, addFav, removeFav } = useContext(FavsContext);
  const isFav = useMemo(() => checkFav(id), [checkFav, id]);

  const handleFav = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isFav) {
        removeFav(id);
      } else {
        addFav(id);
      }
    },
    [isFav, addFav, removeFav, id]
  );

  return (
    <button onClick={handleFav} data-testid="card-widget">
      {!isFav ? (
        <IconStar className={clsx(FavsWidget, FavsWidgetEmptyStar)} />
      ) : (
        <IconStarFilled className={clsx(FavsWidget, FavsWidgetFilledStar)} />
      )}
    </button>
  );
};

export default FavsWidget;
