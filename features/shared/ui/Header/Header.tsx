"use client";

import Link from "next/link";

import { HeaderProps } from "@/types";

import { useModalContext, useSharedContext } from "@shared/contexts";
import { Drawer } from "@shared/ui";
import { IconBrandGithub, IconMenu } from "@tabler/icons-react";
import { FavoritesWidget, SearchWidget } from "@users/ui";

import { ROUTES, Z_INDEX_STICKY } from "../../constants";
import Button from "../Button/Button";
import Container from "../Container/Container";
import HeaderSlotComponent from "../HeaderSlotComponent/HeaderSlotComponent";
import Typography from "../Typography/Typography";
import styles from "./Header.module.scss";

const {
  header,
  headerBrand,
  headerBrandIcon,
  headerRightSlotMobile,
  headerRightSlotMobileIcon,
  headerRightSlotDesktop,
  headerDrawer,
  headerContainer,
  headerBrandTitle,
} = styles;

const Header = ({ rightSlot = undefined }: HeaderProps) => {
  const { headerRef } = useSharedContext();
  const { openModal, closeAllModals } = useModalContext();

  const handleMenuClick = () => {
    if (!rightSlot) return;

    const isFavorites =
      (Array.isArray(rightSlot) ? rightSlot[0] : rightSlot).type ===
      "favorites";

    openModal(
      <Drawer>
        {/* TODO Check here the favorites styles for the drawer */}
        <div className={headerDrawer}>
          {isFavorites ? (
            <FavoritesWidget
              onClick={closeAllModals}
              showLabel={true}
              variant="drawer"
            />
          ) : (
            <HeaderSlotComponent components={rightSlot} variant="drawer" />
          )}
        </div>
      </Drawer>,
      {
        ariaLabel: "Navigation drawer",
      }
    );
  };

  return (
    <header
      ref={headerRef}
      className={header}
      style={{ zIndex: Z_INDEX_STICKY }}
    >
      <Container>
        <nav className={headerContainer}>
          <Link href={ROUTES.HOME.href} className={headerBrand}>
            <IconBrandGithub className={headerBrandIcon} />
            <Typography
              as="h1"
              size="md"
              weight="bold"
              variant="primary"
              className={headerBrandTitle}
            >
              Github{" "}
              <Typography as="span" size="md" weight="bold" variant="accent">
                Users
              </Typography>
            </Typography>
          </Link>
          <SearchWidget variant="header" />
          {rightSlot && (
            <>
              <Button
                variant="unstyled"
                onClick={handleMenuClick}
                className={headerRightSlotMobile}
                aria-label="Open navigation menu"
              >
                <IconMenu className={headerRightSlotMobileIcon} />
              </Button>
              <div className={headerRightSlotDesktop}>
                <FavoritesWidget variant="header" />
              </div>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
