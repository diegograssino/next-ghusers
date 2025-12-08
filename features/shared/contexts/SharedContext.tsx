"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { DEFAULT_VIEWPORT_HEIGHT } from "@shared/constants";
import { useIsFetching } from "@tanstack/react-query";

interface SharedProviderProps {
  children: React.ReactNode;
}

interface SharedContextProps {
  isClient: boolean;
  isLoadingUsers: boolean;
  headerRef: React.RefObject<HTMLElement>;
  breadcrumbsRef: React.RefObject<HTMLElement>;
  navbarHeight: number;
  breadcrumbsHeight: number;
  viewportHeight: number;
}

export const SharedContext = createContext<SharedContextProps | undefined>(
  undefined
);

// DOC Helper function to get ref height using offsetHeight (more performant than getBoundingClientRect)
const getRefHeight = (ref: React.RefObject<HTMLElement>): number => {
  return ref.current?.offsetHeight ?? 0;
};

export const SharedProvider = ({ children }: SharedProviderProps) => {
  const [isClient, setIsClient] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [breadcrumbsHeight, setBreadcrumbsHeight] = useState(0);
  // DOC Start with default viewport height as safe fallback before actual measurement
  const [viewportHeight, setViewportHeight] = useState(DEFAULT_VIEWPORT_HEIGHT);
  const headerRef = useRef<HTMLElement>(null);
  const breadcrumbsRef = useRef<HTMLElement>(null);
  const isLoadingUsers =
    useIsFetching({
      queryKey: ["users"],
      exact: false,
      predicate: (query) => {
        return query.state.status === "pending";
      },
    }) > 0;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateAllHeights = () => {
      setNavbarHeight(getRefHeight(headerRef));
      setBreadcrumbsHeight(getRefHeight(breadcrumbsRef));
      const viewportHeight = window.innerHeight;
      if (viewportHeight > 0) {
        setViewportHeight(viewportHeight);
      }
    };

    // DOC Initial measurement (with delay to ensure refs are populated after LayoutClient mounts)
    const timeoutId = setTimeout(updateAllHeights, 100);

    // DOC Using ResizeObserver for element size tracking (see .cursorrules for performance pattern)
    const headerObserver = new ResizeObserver(() => {
      setNavbarHeight(getRefHeight(headerRef));
    });

    const breadcrumbsObserver = new ResizeObserver(() => {
      setBreadcrumbsHeight(getRefHeight(breadcrumbsRef));
    });

    const bodyObserver = new ResizeObserver(() => {
      const viewportHeight = window.innerHeight;
      if (viewportHeight > 0) {
        setViewportHeight(viewportHeight);
      }
    });

    const startObserving = () => {
      if (headerRef.current) {
        headerObserver.observe(headerRef.current);
      }
      if (breadcrumbsRef.current) {
        breadcrumbsObserver.observe(breadcrumbsRef.current);
      }
      if (document.body) {
        bodyObserver.observe(document.body);
      }
    };

    // DOC Try to start observing after a delay (when LayoutClient has mounted and body is available)
    const observeTimeoutId = setTimeout(startObserving, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(observeTimeoutId);
      headerObserver.disconnect();
      breadcrumbsObserver.disconnect();
      bodyObserver.disconnect();
    };
  }, [isClient]);

  const contextValue = useMemo(
    () => ({
      isClient,
      isLoadingUsers,
      headerRef,
      breadcrumbsRef,
      navbarHeight,
      breadcrumbsHeight,
      viewportHeight,
    }),
    [isClient, isLoadingUsers, navbarHeight, breadcrumbsHeight, viewportHeight]
  );

  return (
    <SharedContext.Provider value={contextValue}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  const context = useContext(SharedContext);
  if (context === undefined) {
    throw new Error("useSharedContext must be used within a SharedProvider");
  }
  return context;
};
