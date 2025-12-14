export type Styles = {
  pulse: string;
  searchWidget: string;
  searchWidgetContainer: string;
  searchWidgetIcon: string;
  searchWidgetInnerContainer: string;
  searchWidgetLoading: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
