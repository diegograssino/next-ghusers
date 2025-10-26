import { PerPageConfig } from "../../../types";

// TODO validate these values with real device testing
export const PER_PAGE_CONFIGS: PerPageConfig = {
  mobile: { items: "10", columns: "1" },
  tablet: { items: "12", columns: "1" },
  desktop: { items: "24", columns: "1" },
  console: { items: "32", columns: "1" },
  smarttv: { items: "32", columns: "1" },
  wearable: { items: "8", columns: "1" },
  embedded: { items: "24", columns: "1" },
};
