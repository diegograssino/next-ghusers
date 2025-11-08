"use client";
import FavsPage from "@/features/pages/FavsPage/FavsPage";
import { PageMessage } from "@/features/shared/ui";
import { FavsContext } from "@/features/users/contexts/FavsContext";
import { fetchUser } from "@/features/users/services";
import { User } from "@/types";
import { useQueries } from "@tanstack/react-query";
import { useContext } from "react";

export default function Favs() {
  const { favs } = useContext(FavsContext);

  // TODO move fetching logic to a service
  // TODO Create a noFavs pageMessage instead of noResults
  const users = useQueries({
    queries: favs.map((id) => ({
      queryKey: ["user", id],
      queryFn: () => fetchUser(id),
    })),
  });

  const isLoading = users.some((user) => user.isLoading);
  const isError = users.some((user) => user.isError);
  const hasNoFavs = favs.length === 0;

  if (isError) {
    return <PageMessage message="error" />;
  }

  if (isLoading) {
    return <PageMessage message="loading" />;
  }

  if (hasNoFavs) {
    return <PageMessage message="noResults" />;
  }

  const loadedUsers = users.map((user) => user.data).filter(Boolean);
  return <FavsPage users={loadedUsers as User[]} />;
}
