"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { ModalConfig, ModalContextProps, ModalItem, ModalState } from "@/types";

import { DEFAULT_MODAL_CONFIG, DEFAULT_MODAL_Z_INDEX } from "@shared/constants";

import { getUniqueId } from "../lib/utils";

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalItemContext = createContext<string | null>(null);

const DEFAULT_MODAL_STATE: ModalState = {
  modals: [],
};

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalState, setModalState] = useState<ModalState>(DEFAULT_MODAL_STATE);
  const portalRefsRef = useRef<Map<string, React.RefObject<HTMLDivElement>>>(
    new Map()
  );

  const openModal = useCallback(
    (content: React.ReactNode, config?: ModalConfig): string => {
      const id = getUniqueId();
      const newModal: ModalItem = {
        id,
        content,
        config: {
          ...DEFAULT_MODAL_CONFIG,
          ...config,
        },
      };

      setModalState((prevState) => ({
        modals: [...prevState.modals, newModal],
      }));

      return id;
    },
    []
  );

  const closeModal = useCallback((id?: string) => {
    setModalState((prevState) => {
      if (id) {
        return {
          modals: prevState.modals.filter((modal) => modal.id !== id),
        };
      }
      return {
        modals: prevState.modals.slice(0, -1),
      };
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setModalState(DEFAULT_MODAL_STATE);
  }, []);

  const getModalById = useCallback(
    (id: string) => {
      return modalState.modals.find((modal) => modal.id === id) || null;
    },
    [modalState.modals]
  );

  const getModalIndex = useCallback(
    (id: string) => {
      return modalState.modals.findIndex((modal) => modal.id === id);
    },
    [modalState.modals]
  );

  const isTopModal = useCallback(
    (id: string) => {
      const index = modalState.modals.findIndex((modal) => modal.id === id);
      return index !== -1 && index === modalState.modals.length - 1;
    },
    [modalState.modals]
  );

  const getModalZIndex = useCallback(
    (id: string) => {
      const index = modalState.modals.findIndex((modal) => modal.id === id);
      return index !== -1
        ? DEFAULT_MODAL_Z_INDEX + index
        : DEFAULT_MODAL_Z_INDEX;
    },
    [modalState.modals]
  );

  const registerPortalRef = useCallback(
    (id: string, ref: React.RefObject<HTMLDivElement>) => {
      portalRefsRef.current.set(id, ref);
    },
    []
  );

  const getPortalRef = useCallback((id: string) => {
    return portalRefsRef.current.get(id) || null;
  }, []);

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
      closeAllModals,
      getModalById,
      getModalIndex,
      isTopModal,
      getModalZIndex,
      registerPortalRef,
      getPortalRef,
      modalState,
    }),
    [
      openModal,
      closeModal,
      closeAllModals,
      getModalById,
      getModalIndex,
      isTopModal,
      getModalZIndex,
      registerPortalRef,
      getPortalRef,
      modalState,
    ]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
