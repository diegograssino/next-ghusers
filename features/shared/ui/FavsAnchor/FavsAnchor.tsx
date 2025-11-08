"use client";
import { FavsContext } from "@/features/users/contexts/FavsContext";
import { useContext } from "react";
import Anchor from "../Anchor/Anchor";

const FavsAnchor = () => {
  const { favs } = useContext(FavsContext);

  return (
    <Anchor variant="primary" href="./favs">
      Favs ({favs.length})
    </Anchor>
  );
};

export default FavsAnchor;
