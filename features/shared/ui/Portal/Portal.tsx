"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";

import { PortalProps } from "@/types";

import {
  DEFAULT_MODAL_CONFIG,
  DEFAULT_MODAL_Z_INDEX,
  DEFAULT_OVERLAY_ARIA_LABEL,
} from "@shared/constants";
import { ModalItemContext, useModalContext } from "@shared/contexts";

import Overlay from "../Overlay/Overlay";
import styles from "./Portal.module.scss";

const { portal, content } = styles;

const Portal = ({
  children,
  isOpen,
  onClose,
  config = {},
  zIndex = DEFAULT_MODAL_Z_INDEX,
  portalRef,
}: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const internalPortalRef = useRef<HTMLDivElement>(null);
  const modalId = useContext(ModalItemContext);
  // DOC Portal is used within modal system (via Drawer/Modal), so context is always available
  const { registerPortalRef, isTopModal } = useModalContext();

  // DOC Use provided ref or create internal ref
  const ref = portalRef || internalPortalRef;

  // DOC Register portal ref with context for focus management (only for top modal)
  useEffect(() => {
    if (modalId && isTopModal(modalId)) {
      registerPortalRef(modalId, ref);
    }
  }, [modalId, isTopModal, registerPortalRef, ref]);

  const mergedConfig = { ...DEFAULT_MODAL_CONFIG, ...config };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  const portalContent = (
    <div
      ref={ref}
      className={clsx(portal, mergedConfig.className)}
      role="dialog"
      aria-modal="true"
      aria-label={mergedConfig.ariaLabel}
      aria-labelledby={mergedConfig.ariaLabelledBy}
      aria-describedby={mergedConfig.ariaDescribedBy}
      tabIndex={-1}
      style={{ zIndex }}
    >
      {mergedConfig.overlay && (
        <Overlay
          onClick={mergedConfig.closeOnOverlayClick ? onClose : undefined}
          opacity={mergedConfig.overlayOpacity}
          aria-label={
            mergedConfig.closeOnOverlayClick
              ? DEFAULT_OVERLAY_ARIA_LABEL
              : undefined
          }
        />
      )}
      <div className={content}>{children}</div>
    </div>
  );

  return createPortal(portalContent, document.body);
};

export default Portal;
