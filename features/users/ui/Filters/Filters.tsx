import { FiltersProps } from "@/types";
import FiltersInfo from "../FiltersInfo/FiltersInfo";
import FiltersInputs from "../FiltersInputs/FiltersInputs";
import styles from "./Filters.module.scss";
const { filters } = styles;

const Filters = ({
  totalCount,
  followersInputValue,
  onFollowersChange,
}: FiltersProps) => {
  // Generate active filters array
  const activeFilters: string[] = [];

  if (followersInputValue && followersInputValue !== "") {
    activeFilters.push(`>${followersInputValue} followers`);
  }

  return (
    <div className={filters}>
      <FiltersInfo totalCount={totalCount} activeFilters={activeFilters} />
      <FiltersInputs
        followersInputValue={followersInputValue}
        onFollowersChange={onFollowersChange}
      />
    </div>
  );
};

export default Filters;
