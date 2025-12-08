import { Params } from "next/dist/server/request/params";

import UserDetailPage from "@/features/pages/UserDetailPage/UserDetailPage";
import { UserPageProps } from "@/types";

import { Typography } from "@shared/ui";
import { fetchUserAction, fetchUserReposAction } from "@users/actions";

const UserPage = async ({ params }: UserPageProps) => {
  const { id } = (await params) as Params;
  // TODO Can we handle the conversion to number on function? Is other aproach to avoid conversions?
  const [user, repos] = await Promise.all([
    fetchUserAction(Number(id)),
    fetchUserReposAction(Number(id)),
  ]);
  // TODO explore implement slugs with username (if we can)
  // TODO improve error handling and display, now and error is thrown

  if (!user) {
    return (
      <Typography weight="bold" size="xl" as="h2">
        An error has occurred while fetching users. Try again later.
      </Typography>
    );
  }

  return <UserDetailPage user={user} repos={repos} />;
};

export default UserPage;
