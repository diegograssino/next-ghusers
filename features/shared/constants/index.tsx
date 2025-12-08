import { PerPageConfig, Routes } from "../../../types";

// TODO validate these values with real device testing
export const PER_PAGE_CONFIGS: PerPageConfig = {
  mobile: { items: "10", columns: "2" },
  tablet: { items: "16", columns: "2" },
  desktop: { items: "20", columns: "2" },
  console: { items: "40", columns: "2" },
  smarttv: { items: "40", columns: "2" },
  wearable: { items: "8", columns: "1" },
  embedded: { items: "20", columns: "2" },
};

export const ROUTES: Routes = {
  HOME: {
    label: "Home",
    href: "/",
    heroText: "Discover GitHub Users",
  },
  FAVORITES: {
    label: "Favorites",
    href: "/favorites",
  },
  USER_DETAIL: (login: string) => ({
    label: login,
    href: `/${login}`,
  }),
};

export const FETCH_TIMEOUT_MS = 10000;
export const DEBOUNCE_DELAY_MS = 1000;
export const STALE_TIME_ONE_MINUTE_MS = 1000 * 60;
export const DEFAULT_VIEWPORT_HEIGHT = 1000;
