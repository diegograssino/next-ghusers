import Link from "next/link";

import Container from "../Container/Container";
import FavsAnchor from "../FavsAnchor/FavsAnchor";
import Typography from "../Typography/Typography";
import styles from "./Header.module.scss";

const { navbar, navbarContainer } = styles;

const Header = () => {
  // TODO Add a logo image
  // TODO Work in responsiveness
  // TODO Add a mobile menu
  // TODO Add dynamic height based on scroll, should be smaller when scrolling down

  return (
    <header className={navbar} data-testid="header">
      <Container>
        <nav className={navbarContainer}>
          <Link href="/">
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
