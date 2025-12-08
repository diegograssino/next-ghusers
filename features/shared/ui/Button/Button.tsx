import { forwardRef } from "react";

import Link from "next/link";

import clsx from "clsx";

import { getStyleClass } from "@/features/shared/lib/utils";
import { ButtonProps } from "@/types";

import styles from "./Button.module.scss";

const { button } = styles;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      as,
      href,
      disabled = false,
      type = "button",
      ...otherProps
    },
    ref
  ) => {
    const className = clsx(
      button,
      getStyleClass(styles, variant),
      getStyleClass(styles, size),
      disabled && styles.disabled,
      otherProps.className
    );

    if (as === Link || href) {
      const linkProps = otherProps as React.ComponentProps<typeof Link>;
      // DOC Exclude href from spread to use the one from props
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { href: _excludedHref, ...restLinkProps } = linkProps;
      return (
        <Link
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href || linkProps.href}
          {...restLinkProps}
          className={className}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        {...(otherProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        className={className}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
