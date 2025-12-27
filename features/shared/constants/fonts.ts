import { Mona_Sans, Noto_Sans } from "next/font/google";

export const primaryFont = Noto_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const secondaryFont = Mona_Sans({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["400", "700"],
});
