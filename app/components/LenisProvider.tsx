// "use client";
//
// import React, { createContext, useContext, useEffect } from "react";
// import { ReactLenis, useLenis as useOriginalLenis } from "lenis/react";
// import { gsap, ScrollTrigger } from "@/app/lib/gsap";
// import type Lenis from "lenis";
//
// export const LenisContext = createContext<Lenis | null>(null);
// export const useLenisContext = () => useContext(LenisContext);
//
// export default function LenisProvider({
//   children,
// }: {
//   children?: React.ReactNode;
// }) {
//   const lenis = useOriginalLenis();
//
//   useEffect(() => {
//     if (!lenis) return;
//
//     const update = (time: number) => {
//       lenis.raf(time * 1000);
//     };
//
//     lenis.on("scroll", ScrollTrigger.update);
//
//     gsap.ticker.add(update);
//     gsap.ticker.lagSmoothing(0);
//
//     if (typeof window !== "undefined") {
//       (window as Window & { lenis?: Lenis }).lenis = lenis;
//     }
//
//     return () => {
//       lenis.off("scroll", ScrollTrigger.update);
//       gsap.ticker.remove(update);
//     };
//   }, [lenis]);
//
//   useEffect(() => {
//     if (!lenis) return;
//     requestAnimationFrame(() => ScrollTrigger.refresh());
//   }, [lenis]);
//
//   return (
//     <LenisContext.Provider value={lenis || null}>
//       <ReactLenis
//         root
//         options={{
//           duration: 1.2,
//           wheelMultiplier: 1.0,
//           smoothWheel: true,
//           easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         }}
//       >
//         {children}
//       </ReactLenis>
//     </LenisContext.Provider>
//   );
// }

"use client";

import React, { createContext, useContext, useEffect } from "react";
import { ReactLenis, useLenis as useOriginalLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
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

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    if (typeof window !== "undefined") {
      (window as Window & { lenis?: Lenis }).lenis = lenis;
    }

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [lenis]);

  return (
    <LenisContext.Provider value={lenis || null}>
      <ReactLenis
        root
        options={{
          duration: 1.2,
        }}
      >
        {children}
      </ReactLenis>
    </LenisContext.Provider>
  );
}
