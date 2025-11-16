import { FiltersProps } from "@/types";
import FiltersInfo from "../FiltersInfo/FiltersInfo";
import styles from "./Filters.module.scss";
const { filters } = styles;

const Filters = ({ totalCount }: FiltersProps) => {
  return (
    <div className={filters}>
      <FiltersInfo totalCount={totalCount}></FiltersInfo>
    </div>
  );
};

export default Filters;
