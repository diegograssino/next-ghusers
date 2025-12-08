import type { Metadata } from "next";
import { Mona_Sans, Noto_Sans } from "next/font/google";
import clsx from "clsx";

import { LayoutClient } from "@shared/ui";

import Providers from "./providers";

import "@/styles/globals.scss";

// TODO Move font configuration to a separate file
const primaryFont = Noto_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const secondaryFont = Mona_Sans({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
