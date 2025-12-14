import { PerPageConfig, Routes } from "../../../types";

export { primaryFont, secondaryFont } from "./fonts";

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
    sectionId: "search-section",
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

export {
  DEFAULT_ARIA_LABEL,
  DEFAULT_MODAL_CONFIG,
  DEFAULT_OVERLAY_ARIA_LABEL,
  DEFAULT_OVERLAY_OPACITY,
} from "./modal.constants";
export {
  DEFAULT_MODAL_Z_INDEX,
  Z_INDEX_DROPDOWN,
  Z_INDEX_FIXED,
  Z_INDEX_MODAL,
  Z_INDEX_MODAL_BACKDROP,
  Z_INDEX_POPOVER,
  Z_INDEX_STICKY,
  Z_INDEX_STICKY_BREADCRUMBS,
  Z_INDEX_STICKY_CONTENT,
  Z_INDEX_TOOLTIP,
} from "./z-index.constants";
