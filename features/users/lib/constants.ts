export const genericBlurData =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rw=";
export const DEFAULT_QUERY_PARAMS = { login: "", followers: "" };
export const DEFAULT_FILTER_STATE = {
  login: "",
  followers: "",
};
export const FILTER_LABEL_FORMATTERS = {
  login: (value: string) => `"${value}" in username`,
  followers: (value: string) => `>${value} followers`,
} as const;

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
export const STALE_DATA_THRESHOLD = 24 * 60 * 60 * 1000;
export const INITIAL_PAGE_PARAM = "0";
export const FIRST_PAGE_PARAM = "1";

export const GITHUB_API_BASE_URL = "https://api.github.com";
export const GITHUB_API_SEARCH_USERS_ENDPOINT = "/search/users";
export const GITHUB_API_USERS_ENDPOINT = "/users";
export const GITHUB_API_REPOS_ENDPOINT = "/repos";
export const GITHUB_API_QUERY_PARAM_Q = "q";
export const GITHUB_API_QUERY_PARAM_PAGE = "page";
export const GITHUB_API_QUERY_PARAM_PER_PAGE = "per_page";
export const GITHUB_API_QUERY_PARAM_SINCE = "since";
export const GITHUB_API_SEARCH_FOLLOWERS_PREFIX = "followers:>";
export const GITHUB_API_SEARCH_LOGIN_PREFIX = "+in:login";
export const GITHUB_API_QUERY_JOINER = "+";
export const GITHUB_API_FILTER_QUERY_FORMAT = {
  followers: (value: string) => `${GITHUB_API_SEARCH_FOLLOWERS_PREFIX}${value}`,
  login: (value: string) => `${value}${GITHUB_API_SEARCH_LOGIN_PREFIX}`,
} as const;
export const GITHUB_API_HEADER_CONTENT_TYPE = "Content-Type";
export const GITHUB_API_HEADER_CONTENT_TYPE_VALUE = "application/json";
export const GITHUB_API_HEADER_USER_AGENT = "User-Agent";
export const GITHUB_API_HEADER_USER_AGENT_VALUE = "GitHub-Users-App";
export const GITHUB_API_HEADER_AUTHORIZATION = "Authorization";
export const GITHUB_API_AUTH_BEARER_PREFIX = "Bearer ";
export const GITHUB_API_HEADER_LINK = "Link";
export const GITHUB_API_HEADER_RATE_LIMIT_REMAINING = "x-ratelimit-remaining";
export const GITHUB_API_HEADER_RATE_LIMIT_RESET = "x-ratelimit-reset";
export const GITHUB_API_ERROR_RATE_LIMIT = "rate limit";
export const GITHUB_API_STATUS_FORBIDDEN = 403;
export const GITHUB_API_RATE_LIMIT_ZERO = "0";
export const GITHUB_API_LINK_REL_NEXT = "next";
export const GITHUB_API_LINK_SEPARATOR = ",";
export const GITHUB_API_LINK_PART_SEPARATOR = ";";
