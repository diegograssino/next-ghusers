import FiltersInfo from "../FiltersInfo/FiltersInfo";
import FiltersInputs from "../FiltersInputs/FiltersInputs";
import styles from "./Filters.module.scss";
const { filtersContainer } = styles;

interface FiltersProps {
  totalCount?: number | undefined;
}

const Filters = ({ totalCount }: FiltersProps) => {
  return (
    <div className={filtersContainer}>
      <FiltersInfo totalCount={totalCount} />
      <FiltersInputs />
    </div>
  );
};

export default Filters;
