export type Styles = {
  header: string;
  headerBrand: string;
  headerBrandIcon: string;
  headerBrandTitle: string;
  headerCenterList: string;
  headerContainer: string;
  headerDrawer: string;
  headerRightSlotDesktop: string;
  headerRightSlotMobile: string;
  headerRightSlotMobileIcon: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
