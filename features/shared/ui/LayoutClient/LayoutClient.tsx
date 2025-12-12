"use client";

import { LayoutClientProps } from "@/types";

import { ModalItemContext, useModalContext } from "@shared/contexts";
import {
  useModalBodyScrollLock,
  useModalFocus,
  useModalKeyboard,
} from "@shared/hooks";
import { Breadcrumbs, Container, Footer, Header } from "@shared/ui";

import styles from "./LayoutClient.module.scss";

const { layoutClient } = styles;

const LayoutClient = ({
  children,
  headerCentralSlot = undefined,
  headerRightSlot = undefined,
}: LayoutClientProps) => {
  const { modalState } = useModalContext();

  useModalBodyScrollLock();
  useModalKeyboard();
  useModalFocus();

  return (
    <div className={layoutClient}>
      <Header centerSlot={headerCentralSlot} rightSlot={headerRightSlot} />
      <Breadcrumbs />
      <Container as="main">{children}</Container>
      <Footer />
      {modalState.modals.map((modal) => (
        <ModalItemContext.Provider key={modal.id} value={modal.id}>
          {modal.content}
        </ModalItemContext.Provider>
      ))}
    </div>
  );
};

export default LayoutClient;
