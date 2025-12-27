export type Styles = {
  pulse: string;
  searchWidgetDesktop: string;
  searchWidgetMobileButton: string;
  searchWidgetMobileButtonContainer: string;
  searchWidgetMobileButtonIcon: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
