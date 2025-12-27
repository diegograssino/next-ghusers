"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useMediaQuery } from "usehooks-ts";

import { DeviceType } from "@/types";

import { DEFAULT_VIEWPORT_HEIGHT } from "@shared/constants";
import { useIsFetching } from "@tanstack/react-query";

interface SharedProviderProps {
  children: React.ReactNode;
  deviceType?: DeviceType;
}

interface SharedContextProps {
  isClient: boolean;
  isLoadingUsers: boolean;
  deviceType: DeviceType;
  isMobileServerSide: boolean;
  isMobileClientSide: boolean;
  isMobile: boolean;
  headerRef: React.RefObject<HTMLElement>;
  breadcrumbsRef: React.RefObject<HTMLElement>;
  navbarHeight: number;
  breadcrumbsHeight: number;
  viewportHeight: number;
}

export const SharedContext = createContext<SharedContextProps | undefined>(
  undefined
);

const getRefHeight = (ref: React.RefObject<HTMLElement>): number => {
  return ref.current?.offsetHeight ?? 0;
};

export const SharedProvider = ({
  children,
  deviceType: deviceTypeProp,
}: SharedProviderProps) => {
  const [isClient, setIsClient] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [breadcrumbsHeight, setBreadcrumbsHeight] = useState(0);
  // DOC Start with default viewport height as safe fallback before actual measurement
  const [viewportHeight, setViewportHeight] = useState(DEFAULT_VIEWPORT_HEIGHT);
  const headerRef = useRef<HTMLElement>(null);
  const breadcrumbsRef = useRef<HTMLElement>(null);

  // TODO Review isLoadingUsers implementation - consider using fetchStatus: "fetching" instead of status === "pending"
  const isLoadingUsers =
    useIsFetching({
      queryKey: ["users"],
      exact: false,
      predicate: (query) => {
        return query.state.status === "pending";
      },
    }) > 0;
  // TODO This would provide more accurate loading state detection (includes background refetches)
  // const isLoadingUsers =
  //   useIsFetching({
  //     queryKey: ["users"],
  //     exact: false,
  //     fetchStatus: "fetching",
  //   }) > 0;
  const deviceType = useMemo(() => {
    if (deviceTypeProp) return deviceTypeProp;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const deviceParam = params.get("device");
      if (deviceParam) {
        return deviceParam as DeviceType;
      }
    }
    return "desktop";
  }, [deviceTypeProp]);
  // TODO Refactor to receive the breakpoint from constants
  const isMobileClientSide = useMediaQuery(`(max-width: 768px)`);

  const isMobileServerSide = useMemo(() => {
    return deviceType === "mobile";
  }, [deviceType]);

  const isMobile = useMemo(() => {
    return isMobileClientSide ? isMobileClientSide : isMobileServerSide;
  }, [isMobileServerSide, isMobileClientSide]);

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
      deviceType,
      isMobileServerSide,
      isMobileClientSide,
      isMobile,
      headerRef,
      breadcrumbsRef,
      navbarHeight,
      breadcrumbsHeight,
      viewportHeight,
    }),
    [
      isClient,
      isLoadingUsers,
      deviceType,
      isMobileServerSide,
      isMobileClientSide,
      isMobile,
      navbarHeight,
      breadcrumbsHeight,
      viewportHeight,
    ]
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
