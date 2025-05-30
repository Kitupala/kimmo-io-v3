import React from "react";
import type { Metadata } from "next";
import { everett } from "./fonts";
import "./globals.css";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
      <body className={`${everett.variable} antialiased`}>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
