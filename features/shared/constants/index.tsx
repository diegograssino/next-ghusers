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
  },
  FAVS: {
    label: "Favorites",
    href: "/favs",
  },
  USER_DETAIL: (id: number | string) => ({
    label: `User ${id}`,
    href: `/${id}`,
  }),
};
