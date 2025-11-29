import { useSharedContext } from "@/features/shared/contexts/SharedContext";
import { formatNumber } from "@/features/shared/lib/utils";
import { Typography } from "@/features/shared/ui";
import { useFiltersContext } from "@/features/users/contexts/FiltersContext";
import {
  formatFilterLabel,
  getNonLoginFilters,
} from "@/features/users/lib/utils";
import { FiltersInfoProps } from "@/types/ui";

import { IconX } from "@tabler/icons-react";
import Pill from "../Pill/Pill";
import styles from "./FilterInfo.module.scss";

const {
  filtersInfo,
  filtersInfoCount,
  filtersInfoApplied,
  filtersInfoAppliedTitle,
  filtersInfoPillsContainer,
  filtersInfoAppliedButton,
  filtersInfoAppliedIcon,
  filtersInfoAppliedTitleContainer,
  filtersInfoCountPlaceholder,
} = styles;

const FiltersInfo = ({ totalCount }: FiltersInfoProps) => {
  const { isLoadingUsers } = useSharedContext();
  const { filters, clearFilters, removeFilter } = useFiltersContext();

  // TODO Work on responsivness
  const isOneUserFound = totalCount === 1;
  const nonLoginFilters = getNonLoginFilters(filters);
  const isOtherFiltersApplied = nonLoginFilters.length > 0;
  // TODO Showing all results texts still being present when is loading
  const isLoadingTotalCount = isLoadingUsers && totalCount === undefined;

  return (
    <div className={filtersInfo}>
      <section className={filtersInfoCount}>
        {!isLoadingTotalCount ? (
          <>
            <Typography as="span" size="sm">
              {!totalCount ? `Showing all` : formatNumber(totalCount)}
            </Typography>
            <Typography as="span" size="sm">
              {isOneUserFound ? ` result` : ` results`}
            </Typography>
          </>
        ) : (
          <div className={filtersInfoCountPlaceholder} />
        )}
      </section>
      <section className={filtersInfoApplied}>
        <div className={filtersInfoAppliedTitleContainer}>
          <Typography
            as="h3"
            size="sm"
            weight="bold"
            className={filtersInfoAppliedTitle}
          >
            {isOtherFiltersApplied ? "Filters applied" : "No filters applied"}
          </Typography>
          {isOtherFiltersApplied ? (
            <button className={filtersInfoAppliedButton} onClick={clearFilters}>
              <Typography as="span" size="xs">
                Clear
              </Typography>
              <IconX className={filtersInfoAppliedIcon} />
            </button>
          ) : null}
        </div>
        <div className={filtersInfoPillsContainer}>
          {nonLoginFilters.map(([filterKey, filterValue]) => (
            <Pill
              key={filterKey}
              label={formatFilterLabel(filterKey as "followers", filterValue!)}
              onRemove={() => removeFilter(filterKey as "followers")}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FiltersInfo;
