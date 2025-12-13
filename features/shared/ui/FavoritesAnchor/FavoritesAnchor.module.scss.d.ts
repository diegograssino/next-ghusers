export type Styles = {
  favoritesAnchor: string;
  favoritesAnchorIcon: string;
  favoritesAnchorIconDrawer: string;
  favoritesAnchorIconHeader: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
