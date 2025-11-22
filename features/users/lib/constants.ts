export const genericBlurData =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rw=";

export const DEFAULT_QUERY_PARAMS = { login: "", followers: "" };
export const DEFAULT_FILTER_STATE = {
  login: "",
  followers: "",
};
export const VALID_FILTER_PARAMS = [
  { param: "login", label: "login" },
  { param: "followers", label: "followers" },
] as const;
export const VALID_FOLLOWERS_VALUES = [
  "",
  "100",
  "1000",
  "5000",
  "10000",
] as const;
export const VALID_FILTER_KEYS = VALID_FILTER_PARAMS.map(
  (filter) => filter.param
);
