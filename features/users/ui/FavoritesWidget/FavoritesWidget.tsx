"use client";
import Link from "next/link";

import clsx from "clsx";

import { FavoritesWidgetProps } from "@/types";

import { ROUTES } from "@shared/constants";
import { Button, Typography } from "@shared/ui";
import { IconStarFilled } from "@tabler/icons-react";
import { useFavoritesContext } from "@users/contexts";

import styles from "./FavoritesWidget.module.scss";

const {
  favoritesWidget,
  favoritesWidgetIcon,
  favoritesWidgetIconHeader,
  favoritesWidgetIconDrawer,
  favoritesWidgetDrawer,
} = styles;

const FavoritesWidget = ({
  onClick,
  showLabel = false,
  variant = "header",
}: FavoritesWidgetProps) => {
  const { favorites } = useFavoritesContext();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const typographyVariant = variant === "header" ? "primary" : undefined;
  const iconClass =
    variant === "header"
      ? favoritesWidgetIconHeader
      : favoritesWidgetIconDrawer;

  return (
    <Button
      as={Link}
      href={ROUTES.FAVORITES.href}
      variant="unstyled"
      size="xs"
      onClick={handleClick}
      className={variant === "drawer" ? favoritesWidgetDrawer : undefined}
    >
      <div className={favoritesWidget}>
        <IconStarFilled className={clsx(favoritesWidgetIcon, iconClass)} />
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

export default FavoritesWidget;
