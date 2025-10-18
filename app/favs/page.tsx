"use client";
import FavsPage from "@/features/pages/FavsPage/FavsPage";
import { Typography } from "@/features/ui";
import { FavsContext } from "@/features/users/contexts/FavsContext";
import { fetchUser } from "@/features/users/services";
import { CardGridSkeleton } from "@/features/users/ui/CardGrid/CardGrid";
import { useQueries } from "@tanstack/react-query";
import { useContext } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function Favs() {
  const { favs } = useContext(FavsContext);

  const isMobile = useMediaQuery("(max-width: 30rem)");
  const isTablet = useMediaQuery("(max-width: 48rem)");
  // TODO move perPage logics to an utils file
  const perPage = isMobile ? "6" : isTablet ? "12" : "15";

  // TODO move fetching logic to a service
  const users = useQueries({
    queries: favs.map((id) => ({
      queryKey: ["user", id],
      queryFn: () => fetchUser(id),
    })),
  });

  if (favs.length === 0) {
    return (
      <Typography weight="bold" size="xl" as="h2">
        No favs!
      </Typography>
    );
  }

  const isLoading = users.some((user) => user.isLoading);
  if (isLoading) return <CardGridSkeleton cards={Number(perPage)} />;

  const isError = users.some((user) => user.isError);
  if (isError)
    return (
      <Typography weight="bold" size="xl" as="h2">
        An error has occurred while fetching users. Try again later.
      </Typography>
    );

  const loadedUsers = users.map((user) => user.data).filter(Boolean);
  return <FavsPage users={loadedUsers} />;
}
