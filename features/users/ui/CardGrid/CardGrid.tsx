import { CardGridProps, CardGridSkeletonProps } from "@/types";
import styles from "./CardGrid.module.scss";

const { cardGrid, cardGridSkeleton } = styles;

export const CardGridSkeleton = ({ perPageConfig }: CardGridSkeletonProps) => {
  const cards = perPageConfig ? parseInt(perPageConfig.items) : 3;
  const cols = perPageConfig?.columns || "1";

  return (
    <div
      className={cardGridSkeleton}
      data-testid="card-grid-skeleton"
      style={{ "--grid-cols": cols } as React.CSSProperties}
    >
      {Array.from({ length: cards }).map((_, i) => (
        <div className={cardGridSkeleton} key={"card-skeleton-" + i} />
      ))}
    </div>
  );
};

const CardGrid = ({ children, perPageConfig, ...props }: CardGridProps) => {
  const cols = perPageConfig?.columns || "1";

  return (
    <div
      data-testid="card-grid"
      className={cardGrid}
      style={{ "--grid-cols": cols } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
};

export default CardGrid;
