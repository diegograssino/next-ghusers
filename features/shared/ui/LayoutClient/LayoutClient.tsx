"use client";
import { Breadcrumbs, Container, Footer, Header } from "@shared/ui";

import styles from "./LayoutClient.module.scss";

const { layoutClient } = styles;

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={layoutClient}>
      <Header />
      <Breadcrumbs />
      <Container as="main">{children}</Container>
      <Footer />
    </div>
  );
};

export default LayoutClient;
