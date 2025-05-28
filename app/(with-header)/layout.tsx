import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
