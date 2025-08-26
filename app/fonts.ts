import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";

export const everett = localFont({
  src: [
    {
      path: "../public/fonts/everett/TWKEverett-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/everett/TWKEverett-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/everett/TWKEverett-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-everett",
});

export const digital = localFont({
  src: [
    {
      path: "../public/fonts/digital-7/digital-7.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-digital",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
  weight: ["400", "500", "700"],
});
