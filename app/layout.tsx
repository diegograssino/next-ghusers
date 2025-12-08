import type { Metadata } from "next";

import clsx from "clsx";

import { primaryFont, secondaryFont } from "@shared/constants";
import { LayoutClient } from "@shared/ui";

import Providers from "./providers";

import "@/styles/globals.scss";

// TODO Improve Metadata
export const metadata: Metadata = {
  title: "Github Users by diegograssino",
  description:
    "Browse and discover GitHub users with infinite scroll, search functionality, and favorites management. Built with Next.js, TypeScript, and React Query for optimal performance.",
  icons: {
    icon: "/github.ico",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Providers>
      <html
        lang="en"
        className={clsx(primaryFont.variable, secondaryFont.variable)}
      >
        <body>
          <LayoutClient>{children}</LayoutClient>
        </body>
      </html>
    </Providers>
  );
};

export default RootLayout;
