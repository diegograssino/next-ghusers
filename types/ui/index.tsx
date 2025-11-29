import { pageMessages } from "@/features/shared/ui/PageMessage/PageMessage.constants";
import Link from "next/link";
import { ElementType, HTMLAttributes, JSX } from "react";
import { PerPageConfig, Route } from "../shared";

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

export type WeightVariants = "thin" | "normal" | "bold";

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";
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
export interface TypographyProps
  extends Omit<HTMLAttributes<HTMLOrSVGElement>, "color"> {
  as?: TypographyElements;
  size?: Sizes;
  weight?: WeightVariants;
  truncate?: boolean;
  variant?: ColorVariants;
}

export interface AnchorProps
  extends Omit<React.ComponentProps<typeof Link>, "color"> {
  variant?: ColorVariants;
  size?: Sizes;
  weight?: WeightVariants;
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

export interface CardGridProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  children: React.ReactNode;
  perPageConfig?: PerPageConfig[keyof PerPageConfig];
}

export interface CardGridSkeletonProps {
  perPageConfig?: PerPageConfig[keyof PerPageConfig];
}

export interface PillProps {
  label: string;
  onRemove?: () => void;
}

export interface FiltersInfoProps {
  totalCount?: number;
}

export interface BreadcrumbsProps {
  variant?: ColorVariants;
  size?: Sizes;
}

export interface HeroProps {
  route: Route;
}
