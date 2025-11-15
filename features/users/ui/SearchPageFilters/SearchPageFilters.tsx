import { SearchPageFiltersProps } from "@/types";
import SearchFiltersInfo from "../SearchFilterInfo/SearchResults";
import styles from "./SearchPageFilters.module.scss";
const { searchPageFilters } = styles;

const SearchPageFilters = ({ totalCount }: SearchPageFiltersProps) => {
  return (
    <div className={searchPageFilters}>
      <SearchFiltersInfo totalCount={totalCount}></SearchFiltersInfo>
    </div>
  );
};

export default SearchPageFilters;
