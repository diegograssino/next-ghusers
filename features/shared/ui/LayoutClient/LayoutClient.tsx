"use client";
import { LayoutClientProps } from "@/types";

import { Breadcrumbs, Container, Footer, Header } from "@shared/ui";

import styles from "./LayoutClient.module.scss";

const { layoutClient } = styles;

const LayoutClient = ({
  children,
  headerCentralSlot = undefined,
  headerRightSlot = undefined,
}: LayoutClientProps) => {
  return (
    <div className={layoutClient}>
      <Header centerSlot={headerCentralSlot} rightSlot={headerRightSlot} />
      <Breadcrumbs />
      <Container as="main">{children}</Container>
      <Footer />
    </div>
  );
};

export default LayoutClient;
