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
  | "warning"
  | "muted";

// DOC Button-specific variants - extends ColorVariants with Button-only variants
export type ButtonVariants = ColorVariants | "unstyled";

export type WeightVariants = "thin" | "normal" | "bold";

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

// DOC Omit "color" - Container is a layout component, doesn't use color styling
export interface ContainerProps extends Omit<
  HTMLAttributes<HTMLOrSVGElement>,
  "color"
> {
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
export interface TypographyProps extends Omit<
  HTMLAttributes<HTMLOrSVGElement>,
  "color" | "ref"
> {
  as?: TypographyElements;
  size?: Sizes;
  weight?: WeightVariants;
  truncate?: boolean;
  shadow?: boolean;
  variant?: ColorVariants;
  disabled?: boolean;
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

export interface HeaderProps {
  rightSlot?: HeaderSlotItem | HeaderSlotItem[];
}

export interface LayoutClientProps {
  children: ReactNode;
  headerRightSlot?: HeaderSlotItem | HeaderSlotItem[];
}

export type HeaderSlotItemType = "favorites" | "link" | string;

export interface HeaderSlotItem {
  type: HeaderSlotItemType;
  label?: string;
  href?: string;
  disabled?: boolean;
}

export type DrawerPosition = "left" | "right";

export interface ModalConfig {
  overlay?: boolean;
  overlayOpacity?: number;
  drawerPosition?: DrawerPosition;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventBodyScroll?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  className?: string;
}

export interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  config?: ModalConfig;
  zIndex?: number;
  portalRef?: React.RefObject<HTMLDivElement>;
}

export interface ModalItem {
  id: string;
  content: ReactNode;
  config: ModalConfig;
}

export interface ModalState {
  modals: ModalItem[];
}

export interface ModalContextProps {
  openModal: (content: ReactNode, config?: ModalConfig) => string;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
  getModalById: (id: string) => ModalItem | null;
  getModalIndex: (id: string) => number;
  isTopModal: (id: string) => boolean;
  getModalZIndex: (id: string) => number;
  registerPortalRef: (id: string, ref: React.RefObject<HTMLDivElement>) => void;
  getPortalRef: (id: string) => React.RefObject<HTMLDivElement> | null;
  modalState: ModalState;
}

export interface OverlayProps {
  onClick?: () => void;
  opacity?: number;
  className?: string;
  "aria-label"?: string;
}

export interface DrawerProps {
  children: ReactNode;
}
