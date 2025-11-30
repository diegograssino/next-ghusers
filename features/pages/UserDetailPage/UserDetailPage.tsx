import { UserDetailProps } from "@/types";
import { UserDetail } from "@users/ui";

const userDetailPage = ({ user, repos }: UserDetailProps) => {
  return <UserDetail user={user} repos={repos} />;
};

export default userDetailPage;
