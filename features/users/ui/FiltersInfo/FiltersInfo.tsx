import { formatNumber } from "@/features/shared/lib/utils";
import { Typography } from "@/features/shared/ui";
import { FiltersInfoProps } from "@/types";
import { IconX } from "@tabler/icons-react";
import Pill from "../Pill/Pill";
import styles from "./FilterIsnfo.module.scss";

const {
  filtersInfo,
  filtersInfoCount,
  filtersInfoApplied,
  filtersInfoAppliedTitle,
  filtersInfoPillsContainer,
  filtersInfoAppliedButton,
  filtersInfoAppliedIcon,
  filtersInfoAppliedTitleContainer,
} = styles;

const FiltersInfo = ({ totalCount, activeFilters = [] }: FiltersInfoProps) => {
  // TODO Work on responsivness
  const isOneUserFound = totalCount === 1;
  const isFiltersApplied = activeFilters.length > 0;

  return (
    <div className={filtersInfo}>
      <section className={filtersInfoCount}>
        {/* TODO Show a skeleton or loader on loading */}
        <Typography as="span" size="sm">
          {!totalCount ? `Showing all` : formatNumber(totalCount)}
        </Typography>
        <Typography as="span" size="sm">
          {isOneUserFound ? ` result` : ` results`}
        </Typography>
      </section>
      <section className={filtersInfoApplied}>
        <div className={filtersInfoAppliedTitleContainer}>
          <Typography
            as="h3"
            size="sm"
            weight="bold"
            className={filtersInfoAppliedTitle}
          >
            {isFiltersApplied ? "Filters applied" : "No filters applied"}
          </Typography>
          {isFiltersApplied ? (
            <button className={filtersInfoAppliedButton}>
              <Typography as="span" size="xs">
                Clear
              </Typography>
              <IconX className={filtersInfoAppliedIcon} />
            </button>
          ) : null}
        </div>
        <div className={filtersInfoPillsContainer}>
          {activeFilters.map((filter: string, i: number) => (
            // TODO add remove filter function
            <Pill label={filter} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FiltersInfo;
