import { formatNumber } from "@/features/shared/lib/utils";
import { Typography } from "@/features/shared/ui";
import { SearchResultsProps } from "@/types";
import styles from "./SearchResults.module.scss";

const { searchResults } = styles;

const SearchResults = ({ totalCount }: SearchResultsProps) => {
  const isOneUserFound = totalCount === 1;

  return (
    <p className={searchResults}>
      <Typography as="span" size="xs" variant="accent2">
        {!totalCount ? `Showing all ` : formatNumber(totalCount)}
      </Typography>
      <Typography as="span" size="xs" variant="accent2">
        {isOneUserFound ? "result" : "results"}
      </Typography>
    </p>
  );
};

export default SearchResults;
