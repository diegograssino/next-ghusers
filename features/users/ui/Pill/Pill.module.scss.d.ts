export type Styles = {
  'pill': string;
  'pillIcon': string;
  'pillLabel': string;
  'pulse': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
