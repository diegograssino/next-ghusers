"use client";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { ROUTES } from "../../constants";
import { useSharedContext } from "../../contexts/SharedContext";
import Container from "../Container/Container";
import FavoritesAnchor from "../FavoritesAnchor/FavoritesAnchor";
import Typography from "../Typography/Typography";
import styles from "./Header.module.scss";

const { header, headerNavbarContainer, headerNavbarIcon, headerNavbarBrand } =
  styles;

const Header = () => {
  // TODO Add a mobile menu
  const { headerRef } = useSharedContext();

  return (
    <header ref={headerRef} className={header}>
      <Container>
        <nav className={headerNavbarContainer}>
          <Link href={ROUTES.HOME.href} className={headerNavbarBrand}>
            <IconBrandGithub className={headerNavbarIcon} />
            <Typography as="h1" size="md" weight="bold" variant="primary">
              Github{" "}
              <Typography as="span" size="md" weight="bold" variant="accent">
                Users
              </Typography>
            </Typography>
          </Link>
          <ul>
            <li>
              <FavoritesAnchor />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
