import { pageMessages } from "@/features/shared/ui/PageMessage/PageMessage.constants";
import Link from "next/link";
import { ElementType, HTMLAttributes, JSX } from "react";
import { PerPageConfig } from "../shared";

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
export interface ContainerProps extends HTMLAttributes<HTMLOrSVGElement> {
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
export interface TypographyProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: TypographyElements;
  size?: Sizes;
  weight?: WeightVariants;
  truncate?: boolean;
  variant?: ColorVariants;
}

export interface AnchorProps extends React.ComponentProps<typeof Link> {
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

export interface CardGridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  perPageConfig?: PerPageConfig[keyof PerPageConfig];
}

export interface CardGridSkeletonProps {
  perPageConfig?: PerPageConfig[keyof PerPageConfig];
}

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PillProps {
  label: string;
  onRemove?: () => void;
}

export interface FiltersInfoProps {
  totalCount: number | undefined;
  activeFilters?: string[];
}

export interface FiltersInputProps {
  followersInputValue?: string;
  onFollowersChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface FiltersProps extends FiltersInfoProps, FiltersInputProps {}
