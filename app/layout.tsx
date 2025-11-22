import { Container, Footer, Header } from "@/features/shared/ui";
import "@/styles/globals.scss";
import clsx from "clsx";
import type { Metadata } from "next";
import { Mona_Sans, Noto_Sans } from "next/font/google";
import Providers from "./providers";

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

export const metadata: Metadata = {
  title: "Github Users by diegograssino",
  description:
    "Browse and discover GitHub users with infinite scroll, search functionality, and favorites management. Built with Next.js, TypeScript, and React Query for optimal performance.",
  icons: {
    icon: "/github.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html
        lang="en"
        className={clsx(primaryFont.variable, secondaryFont.variable)}
      >
        <body>
          <div className="globalLayout">
            <Header />
            <Container as="main">{children}</Container>
            <Footer />
          </div>
        </body>
      </html>
    </Providers>
  );
}
