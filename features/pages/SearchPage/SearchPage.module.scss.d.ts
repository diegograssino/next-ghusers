export type Styles = {
  'pulse': string;
  'searchPage': string;
  'searchPageAside': string;
  'searchPageHeroContent': string;
  'searchPageInfo': string;
  'searchPageResults': string;
  'searchPageSearch': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
