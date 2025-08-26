import React from "react";
import "@/app/globals.css";
import { everett, robotoMono, digital } from "./fonts";

import type { Metadata } from "next";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import LenisProvider from "@/app/components/LenisProvider";

export const metadata: Metadata = {
  title: "kimmo.io",
  description: "Personal web portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${everett.variable} ${robotoMono.variable} ${digital.variable} antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
