export type Styles = {
  headerIconButtonWidget: string;
  headerIconButtonWidgetIcon: string;
  headerIconButtonWidgetIconDrawer: string;
  headerIconButtonWidgetIconHeader: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
