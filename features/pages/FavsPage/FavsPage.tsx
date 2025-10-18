import { Card, CardGrid, SortButton } from "@/features/users/ui";
import { FavsPageProps } from "@/types";
import { useState } from "react";

const FavsPage = ({ users }: FavsPageProps) => {
  const [sortOrder, setSortOrder] = useState(true);

  const sortedUsers = [...users].sort((a, b) =>
    sortOrder ? a.login.localeCompare(b.login) : b.login.localeCompare(a.login)
  );

  const handleSort = () => setSortOrder((prev) => !prev);

  return (
    <>
      <SortButton onSort={handleSort} sortOrder={sortOrder} />
      <CardGrid>
        {sortedUsers.map((user, i) => (
          <Card key={user.login + i} user={user} />
        ))}
      </CardGrid>
    </>
  );
};

export default FavsPage;
