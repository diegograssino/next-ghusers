export type Styles = {
  'favoritesWidgetEmptyStar': string;
  'favoritesWidgetFilledStar': string;
  'favoritesWidgetIcon': string;
  'pulse': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
