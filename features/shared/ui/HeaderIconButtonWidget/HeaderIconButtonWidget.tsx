"use client";
import Link from "next/link";

import clsx from "clsx";

import { getStyleClass } from "@/features/shared/lib/utils";
import { HeaderSlotItemType } from "@/types";

import { ROUTES } from "@shared/constants";
import { IconStarFilled } from "@tabler/icons-react";
import { useFavoritesContext } from "@users/contexts";

import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import styles from "./HeaderIconButtonWidget.module.scss";

const { headerIconButtonWidget, headerIconButtonWidgetIcon } = styles;

interface HeaderIconButtonWidgetProps {
  type: HeaderSlotItemType;
  onClick?: () => void;
  showLabel?: boolean;
  variant?: "header" | "drawer";
}

const HeaderIconButtonWidget = ({
  type,
  onClick,
  showLabel = false,
  variant = "header",
}: HeaderIconButtonWidgetProps) => {
  const { favorites } = useFavoritesContext();

  const renderComponent = (): React.ReactNode => {
    switch (type) {
      case "favorites": {
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
            <div className={headerIconButtonWidget}>
              <IconStarFilled
                className={clsx(
                  headerIconButtonWidgetIcon,
                  getStyleClass(
                    styles,
                    `headerIconButtonWidgetIcon${variantCapitalized}`
                  )
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
      }

      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
};

export default HeaderIconButtonWidget;
