"use client";

import { ROUTES } from "@/features/shared/constants";
import { BreadcrumbsProps, Route } from "@/types";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { getUniqueId } from "../../lib/utils";
import Anchor from "../Anchor/Anchor";
import Typography from "../Typography/Typography";
import styles from "./Breadcrumbs.module.scss";

const { breadcrumbs, breadcrumbsContainer } = styles;

const Breadcrumbs = ({
  variant = undefined,
  size = "sm",
}: BreadcrumbsProps) => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/").filter(Boolean);

  const lastThreeParts = pathnameParts.slice(-3);

  const mapPartToRoute = (
    part: string,
    index: number,
    allParts: string[]
  ): Route => {
    const href = "/" + allParts.slice(0, index + 1).join("/");
    // Check if it matches any known static route (excluding functions like USER_DETAIL)
    const staticRoutes = Object.values(ROUTES).filter(
      (route) => typeof route === "object" && "href" in route
    ) as Route[];
    const matchingRoute = staticRoutes.find((route) => {
      const routePath = route.href.replace(/^\//, "");
      return routePath === part;
    });
    if (matchingRoute) {
      return matchingRoute;
    }
    // Check if it's a number (user ID) - for dynamic routes like USER_DETAIL
    const userId = Number(part);
    if (!isNaN(userId) && userId > 0) {
      return ROUTES.USER_DETAIL(userId);
    }
    return {
      label: part,
      href,
    };
  };

  const routes: Route[] = [];
  routes.push(ROUTES.HOME);
  if (pathname !== "/") {
    lastThreeParts.forEach((part, index) => {
      const actualIndex = pathnameParts.length - lastThreeParts.length + index;
      routes.push(mapPartToRoute(part, actualIndex, pathnameParts));
    });
  }

  return (
    <nav className={breadcrumbs}>
      <div className={breadcrumbsContainer}>
        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          return (
            <Fragment key={getUniqueId()}>
              {index > 0 ? (
                <Typography as="span" size={size} variant={variant}>
                  /
                </Typography>
              ) : null}
              {isLast ? (
                <Typography
                  as="span"
                  size={size}
                  weight="bold"
                  variant={variant}
                >
                  {route.label}
                </Typography>
              ) : (
                <Anchor size={size} href={route.href} variant={variant}>
                  {route.label}
                </Anchor>
              )}
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
