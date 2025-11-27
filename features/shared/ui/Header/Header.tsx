import Link from "next/link";

import { IconBrandGithub } from "@tabler/icons-react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
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
          {/* TODO Links should be in a constants file */}
          <Link href="/" className={headerNavbarBrand}>
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
        <Breadcrumbs />
      </Container>
    </header>
  );
};

export default Header;
