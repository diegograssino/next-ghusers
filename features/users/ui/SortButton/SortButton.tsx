import { Typography } from "@/features/ui";
import { SortButtonProps } from "@/types";
import styles from "./SortButton.module.scss";

const { sortButton } = styles;

const SortButton = ({ sortOrder, onSort }: SortButtonProps) => {
  return (
    <button onClick={onSort} className={sortButton}>
      <Typography size="lg" weight="bold">
        Sort {sortOrder ? "ASC" : "DESC"}
      </Typography>
    </button>
  );
};

export default SortButton;
