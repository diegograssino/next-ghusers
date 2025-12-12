import { ModalConfig } from "@/types";

export const DEFAULT_OVERLAY_OPACITY = 0.75;
export const DEFAULT_ARIA_LABEL = "Modal dialog";
export const DEFAULT_OVERLAY_ARIA_LABEL = "Close modal";

export const DEFAULT_MODAL_CONFIG: ModalConfig = {
  overlay: true,
  overlayOpacity: DEFAULT_OVERLAY_OPACITY,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  preventBodyScroll: true,
  ariaLabel: DEFAULT_ARIA_LABEL,
};
