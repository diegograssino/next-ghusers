export type Styles = {
  'accent': string;
  'accent2': string;
  'button': string;
  'default': string;
  'disabled': string;
  'error': string;
  'inverse': string;
  'lg': string;
  'md': string;
  'primary': string;
  'pulse': string;
  'secondary': string;
  'sm': string;
  'spin': string;
  'success': string;
  'unstyled': string;
  'warning': string;
  'xl': string;
  'xs': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
