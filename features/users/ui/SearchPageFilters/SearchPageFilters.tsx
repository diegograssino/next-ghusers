import styles from "./SearchPageFilters.module.scss";
const { searchPageFilters } = styles;

const SearchPageFilters = () => {
  // TODO On infinite scroll, if you have some delay, the container seems to jump

  return <div className={searchPageFilters}>Filters</div>;
};

export default SearchPageFilters;
