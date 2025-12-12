"use client";
import Link from "next/link";

import { ROUTES } from "@shared/constants";
import { IconStarFilled } from "@tabler/icons-react";
import { useFavoritesContext } from "@users/contexts";

import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import styles from "./FavoritesAnchor.module.scss";

const { favoritesAnchor, favoritesAnchorIcon } = styles;

interface FavoritesAnchorProps {
  onClick?: () => void;
  showLabel?: boolean;
}

// TODO Abstract this component to a NavbarWidget component, so we can pass different icons and labels, and some other features
const FavoritesAnchor = ({
  onClick,
  showLabel = false,
}: FavoritesAnchorProps = {}) => {
  const { favorites } = useFavoritesContext();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      as={Link}
      href={ROUTES.FAVORITES.href}
      variant="unstyled"
      size="xs"
      onClick={handleClick}
    >
      <div className={favoritesAnchor}>
        <IconStarFilled className={favoritesAnchorIcon} />
        {showLabel && (
          <Typography as="span" size="xs" variant="primary">
            {ROUTES.FAVORITES.label}
          </Typography>
        )}
        <Typography as="span" size="xs" variant="primary">
          ({favorites.length})
        </Typography>
      </div>
    </Button>
  );
};

export default FavoritesAnchor;
