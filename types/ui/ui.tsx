import {
  ButtonHTMLAttributes,
  ComponentProps,
  ElementType,
  HTMLAttributes,
  JSX,
  ReactNode,
} from "react";

import { StaticImageData } from "next/image";
import Link from "next/link";

import { pageMessages } from "@/features/shared/ui/PageMessage/PageMessage.constants";

export type ColorVariants =
  | "default"
  | "inverse"
  | "primary"
  | "secondary"
  | "accent"
  | "accent2"
  | "success"
  | "error"
  | "warning";

// DOC Button-specific variants - extends ColorVariants with Button-only variants
export type ButtonVariants = ColorVariants | "unstyled";

export type WeightVariants = "thin" | "normal" | "bold";

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";
// DOC Omit "color" - Container is a layout component, doesn't use color styling
export interface ContainerProps
  extends Omit<HTMLAttributes<HTMLOrSVGElement>, "color"> {
  as?: ElementType;
}

type TypographyElements =
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";
// DOC Omit "color" to use variant prop instead (variant controls text color via ColorVariants)
// DOC Omit "ref" because Typography doesn't use forwardRef - refs are not supported
export interface TypographyProps
  extends Omit<HTMLAttributes<HTMLOrSVGElement>, "color" | "ref"> {
  as?: TypographyElements;
  size?: Sizes;
  weight?: WeightVariants;
  truncate?: boolean;
  shadow?: boolean;
  variant?: ColorVariants;
}

export type IconNames =
  | "star-empty"
  | "star"
  | "arrow-right"
  | "search"
  | "spinner";
export interface IconProps {
  name: IconNames;
  size?: Sizes;
  variant?: ColorVariants;
}

export type Icons = {
  [key in IconNames]: JSX.Element;
};

export interface PageMessageProps {
  message: keyof typeof pageMessages;
}

export interface BreadcrumbsProps {
  variant?: ColorVariants;
  size?: Sizes;
}

// DOC Omit "color" - Hero is a layout component with background image, doesn't use color styling
export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  backgroundImage?: string | StaticImageData;
  alt: string;
  children?: ReactNode;
}

// DOC Omit "color" to use variant prop instead (variant controls button colors via ButtonVariants)
type ButtonAsButton = Omit<HTMLAttributes<HTMLButtonElement>, "color"> & {
  as?: "button";
  variant?: ButtonVariants;
  size?: Sizes;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  href?: never;
};

// DOC Omit "color" to use variant prop instead (variant controls link colors via ButtonVariants)
type ButtonAsLink = Omit<ComponentProps<typeof Link>, "color"> & {
  as?: typeof Link;
  variant?: ButtonVariants;
  size?: Sizes;
  disabled?: never;
  type?: never;
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;
