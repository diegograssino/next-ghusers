import Link from "next/link";

import { IconBrandGithub } from "@tabler/icons-react";
import Container from "../Container/Container";
import FavsAnchor from "../FavsAnchor/FavsAnchor";
import Typography from "../Typography/Typography";
import styles from "./Header.module.scss";

const { navbar, navbarContainer, navbarIcon, navbarBrand } = styles;

const Header = () => {
  // TODO Add a mobile menu

  return (
    <header className={navbar} data-testid="header">
      <Container>
        <nav className={navbarContainer}>
          {/* TODO Links should be in a constants file */}
          <Link href="/" className={navbarBrand}>
            <IconBrandGithub className={navbarIcon} />
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
