// "use client";
//
// import { RefObject, useRef } from "react";
// import { gsap, useGSAP, ScrollTrigger } from "@/app/lib/gsap";
// import type Lenis from "lenis";
//
// interface UseLenisParallaxProps {
//   lenis: Lenis | null;
//   sectionRef: RefObject<HTMLElement | null>;
//   targetRef: RefObject<HTMLElement | null>;
//   startY?: number;
//   moveDistance?: number;
//   scrub?: number;
// }
//
// export function useLenisParallax({
//   lenis,
//   sectionRef,
//   targetRef,
//   startY = 200,
//   moveDistance = 200,
//   scrub = 1,
// }: UseLenisParallaxProps) {
//   const initialized = useRef(false);
//
//   useGSAP(
//     () => {
//       if (!lenis || !sectionRef.current || !targetRef.current) return;
//       if (initialized.current) return;
//
//       const el = targetRef.current;
//
//       gsap.set(el, { y: startY });
//
//       const init = () => {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             scroller: document.documentElement,
//             start: "top bottom",
//             end: "bottom top",
//             scrub,
//             invalidateOnRefresh: true,
//           },
//         });
//
//         tl.to(el, {
//           y: startY - moveDistance,
//           ease: "none",
//           force3D: true,
//           duration: 1,
//         });
//
//         initialized.current = true;
//
//         ScrollTrigger.refresh();
//
//         return () => {
//           tl.scrollTrigger?.kill();
//         };
//       };
//
//       requestAnimationFrame(() => {
//         init();
//       });
//     },
//     { dependencies: [lenis], scope: sectionRef },
//   );
// }

"use client";

import { RefObject, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import type Lenis from "lenis";

interface UseLenisParallaxProps {
  lenis: Lenis | null;
  sectionRef: RefObject<HTMLElement | null>;
  targetRef: RefObject<HTMLElement | null>;
  startY?: number;
  moveDistance?: number;
  scrub?: number;
}

export function useLenisParallax({
  lenis,
  sectionRef,
  targetRef,
  startY = 200,
  moveDistance = 200,
  scrub = 1,
}: UseLenisParallaxProps) {
  useEffect(() => {
    if (!lenis || !sectionRef.current || !targetRef.current) return;

    const el = targetRef.current;

    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === sectionRef.current) t.kill();
    });

    gsap.set(el, { y: startY });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: document.documentElement,
        start: "top bottom",
        end: "bottom top",
        scrub,
        invalidateOnRefresh: true,
      },
    });

    tl.to(el, {
      y: startY - moveDistance,
      ease: "none",
      force3D: true,
      duration: 1,
    });

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", update);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [lenis, startY, moveDistance, scrub, sectionRef, targetRef]);
}
