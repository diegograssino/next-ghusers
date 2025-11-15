import { formatNumber } from "@/features/shared/lib/utils";
import { Typography } from "@/features/shared/ui";
import { SearchFiltersInfoProps } from "@/types";
import { IconX } from "@tabler/icons-react";
import styles from "./SearchFilterIsnfo.module.scss";

const { searchFiltersInfo, searchFiltersInfoPill, searchFiltersInfoPillIcon } =
  styles;

const SearchFiltersInfo = ({ totalCount }: SearchFiltersInfoProps) => {
  // TODO Work on responsivness
  // TODO Componentize each pill, should receive the text and an optional onRemove callback
  const isOneUserFound = totalCount === 1;
  const filtersMock = ["Sort: Ascending"];

  return (
    <div className={searchFiltersInfo}>
      <div className={searchFiltersInfoPill}>
        <Typography as="span" size="xs" variant="primary">
          {!totalCount ? `Showing all` : formatNumber(totalCount)}
        </Typography>
        <Typography as="span" size="xs" variant="primary">
          {isOneUserFound ? ` result` : ` results`}
        </Typography>
      </div>
      {filtersMock.map((filter) => (
        <div key={filter} className={searchFiltersInfoPill}>
          <Typography as="span" size="xs" variant="primary">
            {filter}
          </Typography>
          <IconX className={searchFiltersInfoPillIcon} />
        </div>
      ))}
    </div>
  );
};

export default SearchFiltersInfo;
