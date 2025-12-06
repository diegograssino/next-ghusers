export type Styles = {
  'accent': string;
  'accent2': string;
  'bold': string;
  'default': string;
  'ellipsis': string;
  'inverse': string;
  'lg': string;
  'md': string;
  'normal': string;
  'primary': string;
  'pulse': string;
  'secondary': string;
  'shadow': string;
  'sm': string;
  'spin': string;
  'thin': string;
  'typography': string;
  'xl': string;
  'xs': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
