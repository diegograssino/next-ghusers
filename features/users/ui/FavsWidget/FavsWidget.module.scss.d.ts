export type Styles = {
  'favsWidgetEmptyStar': string;
  'favsWidgetFilledStar': string;
  'favsWidgetIcon': string;
  'pulse': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
