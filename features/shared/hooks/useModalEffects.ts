import { useEffect } from "react";

import { useModalContext } from "@shared/contexts";

export const useModalBodyScrollLock = () => {
  const { modalState } = useModalContext();

  useEffect(() => {
    const hasModals = modalState.modals.length > 0;
    const hasPreventScrollModal = modalState.modals.some(
      (modal) => modal.config.preventBodyScroll
    );

    if (!hasModals || !hasPreventScrollModal) return;

    const bodyElement = document.body;
    const originalOverflow = bodyElement.style.overflow;
    const originalPaddingRight = bodyElement.style.paddingRight;

    // DOC Calculate scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    bodyElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      bodyElement.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      bodyElement.style.overflow = originalOverflow;
      bodyElement.style.paddingRight = originalPaddingRight;
    };
  }, [modalState.modals]);
};

export const useModalKeyboard = () => {
  const { modalState, closeModal } = useModalContext();

  useEffect(() => {
    const topModal = modalState.modals[modalState.modals.length - 1];
    if (!topModal || !topModal.config.closeOnEscape) return;

    const doc = document;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeModal();
      }
    };

    doc.addEventListener("keydown", handleEscape, true);
    return () => {
      doc.removeEventListener("keydown", handleEscape, true);
    };
  }, [modalState.modals, closeModal]);
};

// DOC Hook to handle focus management for accessibility - only focus top modal
export const useModalFocus = () => {
  const { modalState, getPortalRef } = useModalContext();

  useEffect(() => {
    const topModal = modalState.modals[modalState.modals.length - 1];
    if (!topModal) return;

    const portalRef = getPortalRef(topModal.id);
    if (!portalRef?.current) return;

    // DOC Store the previously focused element before opening modal
    const previousActiveElement = document.activeElement as HTMLElement;

    // DOC Focus the top modal's portal container
    // DOC Use requestAnimationFrame to ensure DOM is ready
    const focusTimeout = requestAnimationFrame(() => {
      portalRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(focusTimeout);
      // DOC Restore focus to previous element when top modal closes
      if (previousActiveElement && document.contains(previousActiveElement)) {
        previousActiveElement.focus();
      }
    };
  }, [modalState.modals, getPortalRef]);
};
