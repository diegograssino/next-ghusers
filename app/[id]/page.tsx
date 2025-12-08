import { Params } from "next/dist/server/request/params";

import UserDetailPage from "@/features/pages/UserDetailPage/UserDetailPage";
import { getStringParam } from "@/features/shared/lib/utils";
import { UserPageProps } from "@/types";

import { Typography } from "@shared/ui";
import { fetchUserWithReposAction } from "@users/actions";

const UserPage = async ({ params }: UserPageProps) => {
  const { id } = (await params) as Params;
  const userId = getStringParam(id);
  if (!userId) {
    throw new Error("User ID is required");
  }
  const { user, repos } = await fetchUserWithReposAction(userId);
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
