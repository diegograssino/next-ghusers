import React from "react";

import Link from "next/link";

import { getUniqueId } from "@/features/shared/lib/utils";
import { HeaderSlotItem } from "@/types";

import { Button, Typography } from "@shared/ui";

import FavoritesAnchor from "../FavoritesAnchor/FavoritesAnchor";
import headerStyles from "../Header/Header.module.scss";

export interface HeaderSlotComponentProps {
  components: HeaderSlotItem | HeaderSlotItem[];
}

const HeaderSlotComponent = ({ components }: HeaderSlotComponentProps) => {
  const componentsArray = Array.isArray(components) ? components : [components];

  if (!componentsArray || componentsArray.length === 0) {
    return null;
  }

  const renderComponent = (item: HeaderSlotItem): React.ReactNode => {
    switch (item.type) {
      case "favorites":
        return <FavoritesAnchor key={getUniqueId()} />;

      case "link":
        if (!item.href || !item.label) return null;
        const linkButtonProps = {
          as: Link,
          href: item.href,
          size: "xs" as const,
          variant: "unstyled" as const,
          disabled: item.disabled ?? false,
        };
        return (
          <Button
            key={getUniqueId()}
            {...(linkButtonProps as unknown as Parameters<typeof Button>[0])}
          >
            <Typography
              as="span"
              size="xs"
              variant="primary"
              disabled={linkButtonProps.disabled}
            >
              {item.label}
            </Typography>
          </Button>
        );

      default:
        return null;
    }
  };

  const renderedComponents = componentsArray
    .map(renderComponent)
    .filter((component) => component !== null);

  if (renderedComponents.length === 0) {
    return null;
  }

  return (
    <ul className={headerStyles.headerNavbarCenterList}>
      {renderedComponents.map((component) => (
        <li key={getUniqueId()}>{component}</li>
      ))}
    </ul>
  );
};

export default HeaderSlotComponent;
