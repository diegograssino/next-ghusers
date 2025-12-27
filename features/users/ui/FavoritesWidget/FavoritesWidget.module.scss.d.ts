export type Styles = {
  favoritesWidget: string;
  favoritesWidgetDrawer: string;
  favoritesWidgetIcon: string;
  favoritesWidgetIconDrawer: string;
  favoritesWidgetIconHeader: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
