"use client";

import { Fragment } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BreadcrumbsProps, Route } from "@/types";

import { ROUTES, Z_INDEX_STICKY_BREADCRUMBS } from "@shared/constants";
import { useSharedContext } from "@shared/contexts";

import { getUniqueId } from "../../lib/utils";
import Button from "../Button/Button";
import Container from "../Container/Container";
import Typography from "../Typography/Typography";
import styles from "./Breadcrumbs.module.scss";

const { breadcrumbs, breadcrumbsContainer } = styles;

const Breadcrumbs = ({
  variant = undefined,
  size = "xs",
}: BreadcrumbsProps) => {
  const { breadcrumbsRef } = useSharedContext();
  const pathname = usePathname();
  const pathnameParts = pathname.split("/").filter(Boolean);

  const lastThreeParts = pathnameParts.slice(-3);

  const mapPartToRoute = (
    part: string,
    index: number,
    allParts: string[]
  ): Route => {
    const href = "/" + allParts.slice(0, index + 1).join("/");
    // DOC Check if it matches any known static route (excluding functions like USER_DETAIL)
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
    // DOC Check if it's a login (not a known static route) - for dynamic routes like USER_DETAIL, logins are alphanumeric with hyphens and underscores, and not empty
    if (part && /^[a-zA-Z0-9_-]+$/.test(part)) {
      return ROUTES.USER_DETAIL(part);
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
    <Container
      as="nav"
      ref={breadcrumbsRef}
      className={breadcrumbs}
      style={{ zIndex: Z_INDEX_STICKY_BREADCRUMBS }}
    >
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
                <Button
                  as={Link}
                  href={route.href}
                  variant="unstyled"
                  size={size}
                >
                  <Typography size={size} variant={variant} as="span">
                    {route.label}
                  </Typography>
                </Button>
              )}
            </Fragment>
          );
        })}
      </div>
    </Container>
  );
};

export default Breadcrumbs;
