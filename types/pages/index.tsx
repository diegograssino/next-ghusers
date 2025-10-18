import { FetchUsersResult, User } from "../users";

export interface HomePageProps {
  initialUsers?: FetchUsersResult;
}

export interface FavsPageProps {
  users: User[];
}
