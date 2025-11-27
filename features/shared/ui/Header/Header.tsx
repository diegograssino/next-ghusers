import Link from "next/link";

import { IconBrandGithub } from "@tabler/icons-react";
import { ROUTES } from "../../constants";
import Container from "../Container/Container";
import FavsAnchor from "../FavsAnchor/FavsAnchor";
import Typography from "../Typography/Typography";
import styles from "./Header.module.scss";

const { header, headerNavbarContainer, headerNavbarIcon, headerNavbarBrand } =
  styles;

const Header = () => {
  // TODO Add a mobile menu

  return (
    <header className={header} data-testid="header">
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
              <FavsAnchor />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
