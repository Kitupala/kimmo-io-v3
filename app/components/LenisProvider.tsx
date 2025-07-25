"use client";

import React, { createContext, useContext, useEffect } from "react";
import { ReactLenis, useLenis as useOriginalLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);
export const useLenisContext = () => useContext(LenisContext);

export default function LenisProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const lenis = useOriginalLenis();

  useEffect(() => {
    if (!lenis) return;

    gsap.registerPlugin(ScrollTrigger);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    if (typeof window !== "undefined") {
      (window as Window & { lenis?: Lenis }).lenis = lenis;
    }

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(lenis.raf);
    };
  }, [lenis]);

  // Force a ScrollTrigger refresh after Lenis is stable
  useEffect(() => {
    if (!lenis) return;

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(refreshTimer);
  }, [lenis]);

  return (
    <LenisContext.Provider value={lenis || null}>
      <ReactLenis
        root
        options={{
          duration: 1.2,
          wheelMultiplier: 1.0,
          smoothWheel: true,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
        }}
      >
        {children}
      </ReactLenis>
    </LenisContext.Provider>
  );
}
