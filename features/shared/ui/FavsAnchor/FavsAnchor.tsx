"use client";
import { ROUTES } from "@/features/shared/constants";
import { useFavsContext } from "@/features/users/contexts/FavsContext";
import { IconStarFilled } from "@tabler/icons-react";
import Anchor from "../Anchor/Anchor";
import styles from "./FavsAnchor.module.scss";

const { favsAnchor, favsAnchorIcon } = styles;

const FavsAnchor = () => {
  const { favs } = useFavsContext();

  return (
    <Anchor variant="primary" size="sm" href={ROUTES.FAVS.href}>
      <div className={favsAnchor}>
        <IconStarFilled className={favsAnchorIcon} />
        <span>({favs.length})</span>
      </div>
    </Anchor>
  );
};

export default FavsAnchor;
