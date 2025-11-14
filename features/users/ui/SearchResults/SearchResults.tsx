import { formatNumber } from "@/features/shared/lib/utils";
import { Typography } from "@/features/shared/ui";
import { SearchResultsProps } from "@/types";
import styles from "./SearchResults.module.scss";

const { searchResults, searchResultsPill } = styles;

const SearchResults = ({ totalCount }: SearchResultsProps) => {
  // TODO Work on responsivness
  // TODO Check if height should not fit the content instead to have a fixed value
  const isOneUserFound = totalCount === 1;

  return (
    <div className={searchResults}>
      <p className={searchResultsPill}>
        <Typography as="span" size="xs" variant="primary">
          {!totalCount ? `Showing all` : formatNumber(totalCount)}
        </Typography>
        <Typography as="span" size="xs" variant="primary">
          {isOneUserFound ? ` result` : ` results`}
        </Typography>
      </p>
    </div>
  );
};

export default SearchResults;
