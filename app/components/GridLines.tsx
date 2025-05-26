"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/app/lib/utils";
import { BRIGHTNESS_DIM_SETTINGS } from "@/app/constants";

gsap.registerPlugin(useGSAP);

export default function GridLines() {
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const masterTl = gsap.timeline({
        defaults: { ease: "circ.inOut" },
      });

      // Set initial states with alternating transform origins
      linesRef.current.forEach((line, index) => {
        if (!line) return;

        const transformOrigin = index % 2 === 0 ? "top" : "bottom";

        gsap.set(line, {
          scaleY: 0,
          transformOrigin: transformOrigin,
          filter: "brightness(0)",
        });
      });

      masterTl.to(linesRef.current, {
        scaleY: 1,
        filter: "brightness(3)",
        duration: 1,
        stagger: {
          each: 0.1,
          from: "edges",
        },
      });

      // Brightness dimming animation
      masterTl.to(
        linesRef.current.filter(Boolean),
        {
          filter: "brightness(1)",
          duration: BRIGHTNESS_DIM_SETTINGS.duration,
          ease: BRIGHTNESS_DIM_SETTINGS.ease,
        },
        "+=0.1",
      );
    },
    {
      scope: containerRef,
    },
  );

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 -z-10 flex h-full w-screen flex-col items-center justify-items-center"
    >
      {/* BLURRED CIRCLE */}
      <div className="absolute -top-[600px] z-10 h-[950px] w-[950px] rounded-full bg-[#121416]/80 blur-[160px]" />

      {/* VERTICAL LINES*/}
      <div className="flex min-w-fit flex-row gap-[185px] md:gap-[229px]">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              ref={(el: HTMLDivElement | null) => {
                linesRef.current[i] = el;
              }}
              className={cn(
                "bg-grid-line will-change-filter h-screen w-px",
                `${i === 0 || i === 4 ? "max-[970px]:hidden" : ""}`,
              )}
            />
          ))}
      </div>
    </div>
  );
}
