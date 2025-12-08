import { HTMLAttributes } from "react";

import { PerPageConfig } from "../shared/shared";
import { Repo, User } from "./users";

export interface CardProps {
  user: User;
}

export interface CardWidgetProps {
  id: number;
}

export interface UserDetailProps {
  user: User;
  repos: Repo[];
}

export interface SortButtonProps {
  sortOrder: boolean;
  onSort: () => void;
}

export interface CardGridProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  children: React.ReactNode;
  perPageConfig?: PerPageConfig[keyof PerPageConfig];
}

export interface CardGridSkeletonProps {
  perPageConfig?: PerPageConfig[keyof PerPageConfig];
}

export interface PillProps {
  label: string;
  onRemove?: () => void;
}

export interface FiltersInfoProps {
  totalCount?: number;
}

interface Params {
  [key: string]: string;
}

export interface UserPageProps {
  params?: Promise<Params>;
}
