import { DeviceType } from "@/types";
import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  // device.type can be: 'mobile', 'tablet', 'console', 'smarttv',
  // 'wearable', 'embedded', or undefined (for desktop browsers)
  const deviceType: DeviceType = (device.type as DeviceType) || "desktop";

  console.log(
    "Resolved device type: ",
    deviceType,
    " setting d param accordingly."
  );

  url.searchParams.set("d", deviceType);
  return NextResponse.rewrite(url);
}
