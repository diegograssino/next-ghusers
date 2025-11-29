export type Styles = {
  'favsPage': string;
  'favsPageAside': string;
  'favsPageResults': string;
  'favsPageSearch': string;
  'pulse': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
