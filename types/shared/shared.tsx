export type DeviceType =
  | "mobile"
  | "tablet"
  | "desktop"
  | "console"
  | "smarttv"
  | "wearable"
  | "embedded";

export type PerPageConfig = Record<
  DeviceType,
  { items: string; columns: string }
>;

export type QueryParams = Record<string, string | undefined>;

export interface Params {
  param: string;
  value: string;
}

export interface FilterParams extends Params {
  label: string;
}

export interface PageConfig {
  perPageConfig: PerPageConfig[keyof PerPageConfig];
  initialFilters: QueryParams;
}

export interface LogContext {
  [key: string]: unknown;
}

export interface Route {
  label: string;
  href: string;
  heroText?: string;
  sectionId?: string;
}

export interface Routes {
  HOME: Route;
  FAVORITES: Route;
  USER_DETAIL: (login: string) => Route;
}
