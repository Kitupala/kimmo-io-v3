import React from "react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "@/app/globals.css";
import "mouse-follower/dist/mouse-follower.min.css";

import { everett, robotoMono, digital } from "./fonts";

import MouseCursorProvider from "@/app/components/MouseCursorProvider";
import LenisProvider from "@/app/components/LenisProvider";
import { UmamiAnalytics } from "@/app/components/UmamiAnalytics";

export { generateMetadata } from "@/app/generateMetadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
