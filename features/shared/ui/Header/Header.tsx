"use client";

import Link from "next/link";

import { HeaderProps } from "@/types";

import { IconBrandGithub, IconMenu } from "@tabler/icons-react";

import { ROUTES } from "../../constants";
import { useSharedContext } from "../../contexts/SharedContext";
import Button from "../Button/Button";
import Container from "../Container/Container";
import HeaderSlotComponent from "../HeaderSlotComponent/HeaderSlotComponent";
import Typography from "../Typography/Typography";
import styles from "./Header.module.scss";

const {
  header,
  headerNavbarContainer,
  headerNavbarIcon,
  headerNavbarBrand,
  headerNavbarCenter,
  headerNavbarRight,
  headerNavbarMenuButton,
  headerNavbarMenuIcon,
} = styles;

const Header = ({
  centerSlot = undefined,
  rightSlot = undefined,
}: HeaderProps) => {
  const { headerRef } = useSharedContext();

  const handleMenuClick = () => {
    // TODO Open mobile menu modal when implemented
  };

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
          <Button
            variant="unstyled"
            onClick={handleMenuClick}
            className={headerNavbarMenuButton}
          >
            {/* DOC Preferred a css approach instead of using client logics to hide/show the menu button, is a fair trade off by now*/}
            <IconMenu className={headerNavbarMenuIcon} />
          </Button>
          {centerSlot && (
            <div className={headerNavbarCenter}>
              <HeaderSlotComponent components={centerSlot} />
            </div>
          )}
          {rightSlot && (
            <div className={headerNavbarRight}>
              <HeaderSlotComponent components={rightSlot} />
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
