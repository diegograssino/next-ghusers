"use client";
import Link from "next/link";

import clsx from "clsx";

import { getStyleClass } from "@/features/shared/lib/utils";

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
  variant?: "header" | "drawer";
}

// TODO Abstract this component to a NavbarWidget component, so we can pass different icons and labels, and some other features
const FavoritesAnchor = ({
  onClick,
  showLabel = false,
  variant = "header",
}: FavoritesAnchorProps = {}) => {
  const { favorites } = useFavoritesContext();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const typographyVariant = variant === "header" ? "primary" : undefined;
  const variantCapitalized =
    variant.charAt(0).toUpperCase() + variant.slice(1).toLowerCase();

  return (
    <Button
      as={Link}
      href={ROUTES.FAVORITES.href}
      variant="unstyled"
      size="xs"
      onClick={handleClick}
    >
      <div className={favoritesAnchor}>
        <IconStarFilled
          className={clsx(
            favoritesAnchorIcon,
            getStyleClass(styles, `favoritesAnchorIcon${variantCapitalized}`)
          )}
        />
        {showLabel && (
          <Typography as="span" size="xs" variant={typographyVariant}>
            {ROUTES.FAVORITES.label}
          </Typography>
        )}
        <Typography as="span" size="xs" variant={typographyVariant}>
          ({favorites.length})
        </Typography>
      </div>
    </Button>
  );
};

export default FavoritesAnchor;
