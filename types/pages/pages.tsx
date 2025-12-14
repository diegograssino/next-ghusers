import { PageConfig } from "../shared/shared";
import { FetchUsersResult } from "../users/users";

export interface PageParamsProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface HomePageProps {
  initialUsers?: FetchUsersResult;
  pageConfig: PageConfig;
}

export interface FavoritesPageProps {
  pageConfig: PageConfig;
}
