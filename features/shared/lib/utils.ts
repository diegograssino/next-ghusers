import { v4 } from "uuid";

import { DeviceType, PageConfig, PageParamsProps, QueryParams } from "@/types";

import {
  VALID_FILTER_PARAMS,
  VALID_FOLLOWERS_VALUES,
} from "../../users/lib/constants";
import { PER_PAGE_CONFIGS } from "../constants";
import { log } from "./logger";

export const getStringParam = (
  value: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export const getPageConfig = async (
  pageParams: PageParamsProps
): Promise<PageConfig> => {
  const searchParams = await pageParams.searchParams;

  const deviceParam = getStringParam(searchParams.device);
  const deviceType: DeviceType = (deviceParam as DeviceType) || "desktop";
  const perPageConfig = {
    ...PER_PAGE_CONFIGS[deviceType],
  };

  const initialFilters: QueryParams = {};
  VALID_FILTER_PARAMS.forEach(({ param }) => {
    const paramValue = getStringParam(searchParams[param]);
    if (paramValue) {
      if (param === "followers") {
        const isValidFollowers = VALID_FOLLOWERS_VALUES.includes(
          paramValue as (typeof VALID_FOLLOWERS_VALUES)[number]
        );
        if (isValidFollowers) {
          initialFilters[param] = paramValue;
        } else {
          log.warn("Invalid followers parameter received", {
            receivedValue: paramValue,
            validValues: VALID_FOLLOWERS_VALUES,
            userAgent:
              typeof window !== "undefined"
                ? navigator.userAgent
                : "server-side",
          });
        }
      } else {
        initialFilters[param] = paramValue;
      }
    }
  });

  return { perPageConfig, initialFilters };
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const getUniqueId = () => {
  return v4();
};

export const getStyleClass = <T extends Record<string, string>>(
  styles: T,
  key: string | undefined
): string | undefined => {
  return key && key in styles ? styles[key as keyof T] : undefined;
};

const accumulateOffsetTop = (element: HTMLElement | null): number => {
  if (!element) return 0;
  return (
    element.offsetTop +
    accumulateOffsetTop(element.offsetParent as HTMLElement | null)
  );
};

export const getScrollPositionWithOffset = (
  element: HTMLElement,
  offset: number
): number => accumulateOffsetTop(element) - offset;

export const scrollToElementWithOffset = (
  elementId: string,
  offset: number,
  maxRetries = 3
): void => {
  const attemptScroll = (retryCount = 0) => {
    requestAnimationFrame(() => {
      const targetElement = document.getElementById(elementId);
      if (!targetElement) {
        if (retryCount < maxRetries) {
          setTimeout(() => attemptScroll(retryCount + 1), 50);
        }
        return;
      }

      const offsetPosition = getScrollPositionWithOffset(targetElement, offset);

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    });
  };

  attemptScroll();
};
