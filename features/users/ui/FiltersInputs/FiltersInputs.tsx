import { getUniqueId } from "@/features/shared/lib/utils";

import { Typography } from "@shared/ui";
import { VALID_FOLLOWERS_VALUES } from "@users/constants";
import { useFiltersContext } from "@users/contexts";

import { formatFilterLabel } from "../../lib/utils";
import styles from "./FiltersInputs.module.scss";

const {
  filterInputsFollowers,
  filterInputsFollowersLabel,
  filtersInputs,
  filterInputsFollowersTitle,
  filterInputsFollowersCheckbox,
} = styles;

const FiltersInputs = () => {
  const { followersInputValue, updateFilters } = useFiltersContext();
  const followerOptions = VALID_FOLLOWERS_VALUES.map((value) => ({
    label: value === "" ? "All" : formatFilterLabel("followers", value),
    value,
  }));
  const handleFollowerFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    updateFilters({ param: "followers", value });
  };

  return (
    <div className={filtersInputs}>
      <section className={filterInputsFollowers}>
        <Typography
          as="h3"
          size="sm"
          weight="bold"
          className={filterInputsFollowersTitle}
        >
          Filter by followers
        </Typography>
        {followerOptions.map((option) => (
          <label key={getUniqueId()} className={filterInputsFollowersLabel}>
            <input
              type="checkbox"
              checked={followersInputValue === option.value}
              onChange={(e) => handleFollowerFilter(e, option.value)}
              className={filterInputsFollowersCheckbox}
            />
            <Typography as="span" size="sm">
              {option.label}
            </Typography>
          </label>
        ))}
      </section>
    </div>
  );
};

export default FiltersInputs;
