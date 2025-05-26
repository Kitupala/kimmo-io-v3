import localFont from "next/font/local";

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
