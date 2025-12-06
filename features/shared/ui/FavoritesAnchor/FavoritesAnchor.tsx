"use client";
import { ROUTES } from "@shared/constants";
import { IconStarFilled } from "@tabler/icons-react";
import { useFavoritesContext } from "@users/contexts";
import Anchor from "../Anchor/Anchor";
import styles from "./FavoritesAnchor.module.scss";

const { favoritesAnchor, favoritesAnchorIcon } = styles;

const FavoritesAnchor = () => {
  const { favorites } = useFavoritesContext();

  return (
    <Anchor variant="primary" size="sm" href={ROUTES.FAVORITES.href}>
      <div className={favoritesAnchor}>
        <IconStarFilled className={favoritesAnchorIcon} />
        <span>({favorites.length})</span>
      </div>
    </Anchor>
  );
};

export default FavoritesAnchor;

