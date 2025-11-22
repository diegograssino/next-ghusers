"use client";
import { useFavsContext } from "@/features/users/contexts/FavsContext";
import { IconStarFilled } from "@tabler/icons-react";
import Anchor from "../Anchor/Anchor";
import styles from "./FavsAnchor.module.scss";

const { favsAnchor, favsAnchorIcon } = styles;

const FavsAnchor = () => {
  const { favs } = useFavsContext();

  return (
    <Anchor variant="primary" size="sm" href="./favs">
      <div className={favsAnchor}>
        <IconStarFilled className={favsAnchorIcon} />
        <span>({favs.length})</span>
      </div>
    </Anchor>
  );
};

export default FavsAnchor;
