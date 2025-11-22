// Helper function to format filter display text
export const formatFilterLabel = (
  filterKey: "login" | "followers",
  value: string
): string => {
  if (filterKey === "login") {
    return `"${value}" in username`;
  }
  if (filterKey === "followers") {
    return `>${value} followers`;
  }
  return value;
};
