export type Styles = {
  homePage: string;
  homePageAside: string;
  homePageHeroContent: string;
  homePageInfo: string;
  homePageResults: string;
  homePageSearch: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
