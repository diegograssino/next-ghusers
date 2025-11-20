export const genericBlurData =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rw=";

export const DEFAULT_QUERY_PARAMS = { l: "" };

// Default filter state with labels as keys storing just values
export const DEFAULT_FILTER_STATE = {
  login: "",
  followers: "",
};

// Valid filter parameters with labels
export const VALID_FILTER_PARAMS = [
  { param: "l", label: "login" },
  { param: "f", label: "followers" },
] as const;

// Valid followers filter values
export const VALID_FOLLOWERS_VALUES = [
  "",
  "100",
  "1000",
  "5000",
  "10000",
] as const;

// Extract just the param keys for backward compatibility
export const VALID_FILTER_KEYS = VALID_FILTER_PARAMS.map(
  (filter) => filter.param
);
