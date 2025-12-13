export type Styles = {
  filtersInfo: string;
  filtersInfoApplied: string;
  filtersInfoAppliedButton: string;
  filtersInfoAppliedIcon: string;
  filtersInfoAppliedTitle: string;
  filtersInfoAppliedTitleContainer: string;
  filtersInfoCount: string;
  filtersInfoCountPlaceholder: string;
  filtersInfoPillsContainer: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
