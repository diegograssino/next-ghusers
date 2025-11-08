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

export interface PageConfig {
  perPageConfig: PerPageConfig[keyof PerPageConfig];
  searchTermParam: string | undefined;
}

// Logger types
export interface LogContext {
  [key: string]: unknown;
}
