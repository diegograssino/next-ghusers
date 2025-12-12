export type Styles = {
  'drawer': string;
  'drawerCloseButton': string;
  'drawerCloseButtonLeft': string;
  'drawerCloseButtonRight': string;
  'drawerCloseIcon': string;
  'drawerContainer': string;
  'drawerContainerRight': string;
  'drawerLeft': string;
  'drawerRight': string;
  'pulse': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
