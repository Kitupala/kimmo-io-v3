import React from "react";
import type { Metadata } from "next";

import { PrismicPreview } from "@prismicio/next";
import "mouse-follower/dist/mouse-follower.min.css";
import "@/app/globals.css";

import { repositoryName } from "@/prismicio";
import { everett, robotoMono, digital } from "./fonts";

import LenisProvider from "@/app/components/LenisProvider";
import MouseCursorProvider from "@/app/components/MouseCursorProvider";
import { UmamiAnalytics } from "@/app/components/UmamiAnalytics";

export const metadata: Metadata = {
  title: "kimmo.io",
  description: "Personal web portfolio",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${everett.variable} ${robotoMono.variable} ${digital.variable} antialiased`}
      >
        <LenisProvider>
          <MouseCursorProvider>
            {children}
            <div className="bg-noise" />
          </MouseCursorProvider>
        </LenisProvider>
        <UmamiAnalytics />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
