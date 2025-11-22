import UserDetailPage from "@/features/pages/UserDetailPage/UserDetailPage";
import { Typography } from "@/features/shared/ui";
import {
  fetchUserAction,
  fetchUserReposAction,
} from "@/features/users/server/actions";
import { UserPageProps } from "@/types";
import { Params } from "next/dist/server/request/params";

export default async function UserPage({ params }: UserPageProps) {
  const { id } = (await params) as Params;
  const [user, repos] = await Promise.all([
    fetchUserAction(Number(id)),
    fetchUserReposAction(Number(id)),
  ]);
  // TODO explore implement slugs with username
  // TODO improve error handling and display, now and error is thrown

  if (!user) {
    return (
      <Typography weight="bold" size="xl" as="h2">
        An error has occurred while fetching users. Try again later.
      </Typography>
    );
  }

  return <UserDetailPage user={user} repos={repos} />;
}
