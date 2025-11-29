export type Styles = {
  'breadcrumbs': string;
  'breadcrumbsContainer': string;
  'pulse': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
