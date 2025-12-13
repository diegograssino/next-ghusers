export type Styles = {
  card: string;
  cardContent: string;
  cardContentAtSymbol: string;
  cardImage: string;
  cardImageContainer: string;
  cardOptions: string;
  cardSkeleton: string;
  pulse: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
