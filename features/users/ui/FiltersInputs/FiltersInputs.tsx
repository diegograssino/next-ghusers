import { getUniqueId } from "@/features/shared/lib/utils";
import { Typography } from "@/features/shared/ui";
import { FiltersInputProps } from "@/types";
import styles from "./FiltersInputs.module.scss";

const {
  filterInputsFollowers,
  filterInputsFollowersLabel,
  filtersInputs,
  filterInputsFollowersTitle,
  filterInputsFollowersCheckbox,
} = styles;

const FiltersInputs = ({
  followersInputValue,
  onFollowersChange,
}: FiltersInputProps) => {
  const followerOptions = [
    { label: "All", value: "" },
    { label: ">100", value: "100" },
    { label: ">1000", value: "1000" },
    { label: ">5000", value: "5000" },
    { label: ">10000", value: "10000" },
  ];

  const handleFollowersChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    Object.defineProperty(e.target, "value", {
      value: value,
      writable: false,
    });
    onFollowersChange?.(e);
  };

  return (
    <div className={filtersInputs}>
      <section className={filterInputsFollowers}>
        <Typography
          as="h5"
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
              onChange={(e) => handleFollowersChange(e, option.value)}
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
