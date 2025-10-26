import { DeviceType, PageConfig } from "../shared";
import { FetchUsersResult, User } from "../users";

export interface PageParamsProps {
  searchParams: Promise<{ d?: DeviceType; q?: string }>;
}

export interface SearchPageProps {
  initialUsers?: FetchUsersResult;
  pageConfig: PageConfig;
}

export interface FavsPageProps {
  users: User[];
}
