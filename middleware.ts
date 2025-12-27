import { NextRequest, NextResponse, userAgent } from "next/server";

import { DeviceType } from "@/types";

import { log } from "./features/shared/lib/logger";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const ua = userAgent(request);
  const deviceType: DeviceType = (ua.device.type as DeviceType) || "desktop";

  url.searchParams.set("device", deviceType);

  const isPageRoute =
    !url.pathname.match(
      /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|xml|txt)$/
    ) &&
    !url.pathname.startsWith("/_next/") &&
    !url.pathname.startsWith("/api/");

  if (isPageRoute) {
    log.info("Page visited", {
      pathname: url.pathname,
      searchParams: Object.fromEntries(url.searchParams),
      device: deviceType,
      os: ua.os.name,
      browser: ua.browser.name,
    });
  }

  return NextResponse.rewrite(url);
}
