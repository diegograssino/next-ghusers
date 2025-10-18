import UserDetailPage from "@/features/pages/UserDetailPage/UserDetailPage";
import { Typography } from "@/features/ui";
import { fetchUserDetail } from "@/features/users/services";
import { UserPageProps } from "@/types";
import { Params } from "next/dist/server/request/params";

export default async function UserPage({ params }: UserPageProps) {
  const { id } = (await params) as Params;
  const { user, repos } = await fetchUserDetail(Number(id));
  // TODO explore implement slugs with username

  if (!user) {
    return (
      <Typography weight="bold" size="xl" as="h2">
        An error has occurred while fetching users. Try again later.
      </Typography>
    );
  }

  return <UserDetailPage user={user} repos={repos} />;
}
