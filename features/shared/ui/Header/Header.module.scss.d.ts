export type Styles = {
  header: string;
  headerDrawerContent: string;
  headerNavbarBrand: string;
  headerNavbarCenter: string;
  headerNavbarCenterList: string;
  headerNavbarContainer: string;
  headerNavbarIcon: string;
  headerNavbarMenuButton: string;
  headerNavbarMenuIcon: string;
  headerNavbarRight: string;
  headerSlotDrawer: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
