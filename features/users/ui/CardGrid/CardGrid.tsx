import { getUniqueId } from "@/features/shared/lib/utils";
import { CardGridProps, CardGridSkeletonProps } from "@/types";
import { PER_PAGE_CONFIGS } from "@shared/constants";
import clsx from "clsx";
import { CardSkeleton } from "../Card/Card";
import styles from "./CardGrid.module.scss";

const { cardGrid, cardGridSkeleton } = styles;

export const CardGridSkeleton = ({ perPageConfig }: CardGridSkeletonProps) => {
  const cols = perPageConfig?.columns || PER_PAGE_CONFIGS.desktop.columns;
  return (
    <div
      className={clsx(cardGrid, cardGridSkeleton)}
      style={{ "--grid-cols": cols } as React.CSSProperties}
    >
      {Array.from({
        length: 3 * parseInt(cols),
      }).map(() => (
        <CardSkeleton key={getUniqueId()} />
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
