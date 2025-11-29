export type Styles = {
  'header': string;
  'headerNavbarBrand': string;
  'headerNavbarContainer': string;
  'headerNavbarIcon': string;
  'pulse': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
