export type Styles = {
  favoritesButtonWidgetEmptyStar: string;
  favoritesButtonWidgetFilledStar: string;
  favoritesButtonWidgetIcon: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
