"use client";

import { useContext } from "react";

import clsx from "clsx";

import { DrawerProps } from "@/types";

import { ModalItemContext, useModalContext } from "@shared/contexts";
import { Button, Portal } from "@shared/ui";
import { IconX } from "@tabler/icons-react";

import { DEFAULT_DRAWER_POSITION } from "./Drawer.constants";
import styles from "./Drawer.module.scss";

const {
  drawer,
  drawerContainer,
  drawerContainerRight,
  drawerCloseButton,
  drawerCloseButtonLeft,
  drawerCloseButtonRight,
  drawerCloseIcon,
} = styles;

const Drawer = ({ children }: DrawerProps) => {
  const modalId = useContext(ModalItemContext);
  const {
    getModalById,
    isTopModal: isTopModalById,
    getModalZIndex,
    closeModal,
  } = useModalContext();

  if (!modalId) return null;

  const modal = getModalById(modalId);
  if (!modal) return null;

  const drawerPosition = modal.config.drawerPosition || DEFAULT_DRAWER_POSITION;
  const isTopModal = isTopModalById(modalId);
  const zIndex = getModalZIndex(modalId);

  return (
    <Portal
      isOpen={true}
      onClose={() => closeModal(modalId)}
      config={{
        ...modal.config,
        closeOnOverlayClick: modal.config.closeOnOverlayClick && isTopModal,
        className: clsx(
          drawerContainer,
          drawerPosition === "right" && drawerContainerRight,
          modal.config.className
        ),
      }}
      zIndex={zIndex}
    >
      <div
        className={clsx(
          drawer,
          drawerPosition === "left" && styles.drawerLeft,
          drawerPosition === "right" && styles.drawerRight
        )}
      >
        <Button
          variant="unstyled"
          onClick={() => closeModal(modalId)}
          className={clsx(
            drawerCloseButton,
            drawerPosition === "left" && drawerCloseButtonRight,
            drawerPosition === "right" && drawerCloseButtonLeft
          )}
          aria-label="Close drawer"
        >
          <IconX className={drawerCloseIcon} />
        </Button>
        {children}
      </div>
    </Portal>
  );
};

export default Drawer;
