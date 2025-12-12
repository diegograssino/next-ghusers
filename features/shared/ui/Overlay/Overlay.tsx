"use client";
import clsx from "clsx";

import {
  DEFAULT_OVERLAY_ARIA_LABEL,
  DEFAULT_OVERLAY_OPACITY,
} from "@shared/constants";

import styles from "./Overlay.module.scss";

const { overlay } = styles;

interface OverlayProps {
  onClick?: () => void;
  opacity?: number;
  className?: string;
  "aria-label"?: string;
}

const Overlay = ({
  onClick,
  opacity = DEFAULT_OVERLAY_OPACITY,
  className,
  "aria-label": ariaLabel = DEFAULT_OVERLAY_ARIA_LABEL,
}: OverlayProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && onClick) {
      event.preventDefault();
      onClick();
    }
  };
  const shouldCloseOnOverlayClick = onClick && ariaLabel;

  if (shouldCloseOnOverlayClick) {
    return (
      <button
        type="button"
        className={clsx(overlay, className)}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        style={{
          opacity,
        }}
      />
    );
  }

  return (
    <div
      className={clsx(overlay, className)}
      style={{
        opacity,
      }}
      aria-hidden="true"
    />
  );
};

export default Overlay;
