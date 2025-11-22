import { PageConfig } from "../shared";
import { FetchUsersResult, User } from "../users";

export interface PageParamsProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface SearchPageProps {
  initialUsers?: FetchUsersResult;
  pageConfig: PageConfig;
}

export interface FavsPageProps {
  users: User[];
}
