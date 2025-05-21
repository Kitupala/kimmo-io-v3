"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/app/lib/utils";

gsap.registerPlugin(useGSAP);

export default function GridLines() {
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Center line animation
      gsap.fromTo(
        [linesRef.current[2]],
        {
          scaleY: 0,
          transformOrigin: "top",
        },
        {
          scaleY: 1,
          duration: 1,
          ease: "circ.inOut",
          stagger: 0.2,
        },
      );

      // Outer lines animation
      gsap.fromTo(
        [
          linesRef.current[0],
          linesRef.current[1],
          linesRef.current[3],
          linesRef.current[4],
        ],
        {
          scaleY: 0,
          transformOrigin: "bottom",
        },
        {
          scaleY: 1,
          duration: 1,
          delay: 0.25,
          ease: "circ.inOut",
          stagger: {
            each: 0.15,
            from: "center",
          },
        },
      );
    },

    {
      scope: containerRef,
    },
  );

  return (
    <div
      ref={containerRef}
      className="w-screen h-full flex flex-col items-center justify-items-center fixed top-0 left-0 -z-10"
    >
      {/* BLURRED CIRCLE */}
      <div className="w-[950px] h-[950px] rounded-full bg-[#121416]/80 blur-[160px] absolute -top-[600px] -z-10" />

      {/* VERTICAL LINES*/}
      <div className="flex flex-row min-w-fit gap-[185px] md:gap-[229px]">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              ref={(el: HTMLDivElement | null) => {
                linesRef.current[i] = el;
              }}
              className={cn(
                "h-screen w-px bg-grid-line",
                `${i === 0 || i === 4 ? "max-[970px]:hidden" : ""}`,
              )}
            />
          ))}
      </div>
    </div>
  );
}
