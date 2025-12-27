export type Styles = {
  favoritesPage: string;
  favoritesPageAside: string;
  favoritesPageResults: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
