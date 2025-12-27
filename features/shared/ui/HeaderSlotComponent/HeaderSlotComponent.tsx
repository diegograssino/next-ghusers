import React from "react";

import Link from "next/link";

import { getUniqueId } from "@/features/shared/lib/utils";
import { HeaderSlotItem } from "@/types";

import { useModalContext } from "@shared/contexts";
import { Button, Typography } from "@shared/ui";

import styles from "./HeaderSlotComponent.module.scss";

const { headerSlotComponentList, headerSlotComponentDrawer } = styles;

export interface HeaderSlotComponentProps {
  components: HeaderSlotItem | HeaderSlotItem[];
  variant?: "header" | "drawer";
}

const HeaderSlotComponent = ({
  components,
  variant = "header",
}: HeaderSlotComponentProps) => {
  const componentsArray = Array.isArray(components) ? components : [components];
  const { closeAllModals } = useModalContext();

  if (!componentsArray || componentsArray.length === 0) {
    return null;
  }

  const handleItemClick = () => {
    if (variant === "drawer") {
      closeAllModals();
    }
  };

  const renderComponent = (item: HeaderSlotItem): React.ReactNode => {
    switch (item.type) {
      case "link":
        if (!item.href || !item.label) return null;
        const linkButtonProps = {
          as: Link,
          href: item.href,
          size: "xs" as const,
          variant: "unstyled" as const,
          disabled: item.disabled ?? false,
          ...(variant === "drawer" && { onClick: handleItemClick }),
        };
        return (
          <Button
            key={getUniqueId()}
            {...(linkButtonProps as unknown as Parameters<typeof Button>[0])}
          >
            <Typography
              as="span"
              size="xs"
              variant={variant === "header" ? "primary" : undefined}
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

  if (variant === "drawer") {
    return (
      <div className={headerSlotComponentDrawer}>
        {renderedComponents.map((component) => (
          <div key={getUniqueId()}>{component}</div>
        ))}
      </div>
    );
  }

  return (
    <ul className={headerSlotComponentList}>
      {renderedComponents.map((component) => (
        <li key={getUniqueId()}>{component}</li>
      ))}
    </ul>
  );
};

export default HeaderSlotComponent;
