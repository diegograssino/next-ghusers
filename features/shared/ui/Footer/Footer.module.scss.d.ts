export type Styles = {
  footer: string;
  footerContainer: string;
  footerHighlighted: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
