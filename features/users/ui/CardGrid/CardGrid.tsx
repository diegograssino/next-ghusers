import { CardGridProps, CardGridSkeletonProps } from "@/types";
import styles from "./CardGrid.module.scss";

const { cardGrid, cardGridSkeleton } = styles;

export const CardGridSkeleton = ({ cards = 3 }: CardGridSkeletonProps) => {
  return (
    <div className={cardGridSkeleton} data-testid="card-grid-skeleton">
      {Array.from({ length: cards }).map((_, i) => (
        <div className={cardGridSkeleton} key={"card-skeleton-" + i} />
      ))}
    </div>
  );
};

const CardGrid = ({ children }: CardGridProps) => {
  return (
    // TODO Add skeleton logics here
    <div data-testid="card-grid" className={cardGrid}>
      {children}
    </div>
  );
};

export default CardGrid;
