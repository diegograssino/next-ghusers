"use client";
import Link from "next/link";

import { ROUTES } from "@shared/constants";
import { IconStarFilled } from "@tabler/icons-react";
import { useFavoritesContext } from "@users/contexts";

import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import styles from "./FavoritesAnchor.module.scss";

const { favoritesAnchor, favoritesAnchorIcon } = styles;

const FavoritesAnchor = () => {
  const { favorites } = useFavoritesContext();

  return (
    <Button as={Link} href={ROUTES.FAVORITES.href} variant="unstyled" size="sm">
      <div className={favoritesAnchor}>
        <IconStarFilled className={favoritesAnchorIcon} />
        <Typography as="span" size="sm" variant="primary">
          ({favorites.length})
        </Typography>
      </div>
    </Button>
  );
};

export default FavoritesAnchor;
