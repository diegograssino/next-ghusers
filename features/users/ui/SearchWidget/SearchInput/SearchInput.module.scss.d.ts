export type Styles = {
  pulse: string;
  searchInput: string;
  searchInputContainer: string;
  searchInputIcon: string;
  searchInputInput: string;
  searchInputLoading: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
