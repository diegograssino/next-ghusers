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

export interface PageConfig {
  perPageConfig: PerPageConfig[keyof PerPageConfig];
  queryParams: QueryParams;
}

// Logger types
export interface LogContext {
  [key: string]: unknown;
}
