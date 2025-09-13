"use client";

import * as React from "react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { cn } from "@/app/lib/utils";
import { BRIGHTNESS_DIM_SETTINGS } from "@/app/constants";

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
    <>
      {/* BLURRED TOP */}
      <div className="absolute -top-[280px] left-1/2 z-10 h-[700px] w-screen max-w-[1150px] -translate-x-1/2 overflow-hidden xs:-top-[290px] xs:h-[700px] md:-top-[480px] md:h-[1000px]">
        <div className="absolute h-full w-full">
          <TopBlur className="w-full" />
        </div>
      </div>

      <div
        ref={containerRef}
        className="fixed top-0 left-0 -z-20 flex h-full w-screen flex-col items-center justify-items-center"
      >
        {/* VERTICAL LINES*/}
        <div className="flex min-w-fit flex-row gap-[149px] xs:gap-[185px] md:gap-[229px]">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                ref={(el: HTMLDivElement | null) => {
                  linesRef.current[i] = el;
                }}
                className={cn(
                  "h-screen w-px bg-grid-line will-change-[filter]",
                  i === 0 || i === 4 ? "max-[970px]:hidden" : "",
                )}
              />
            ))}
        </div>
      </div>
    </>
  );
}

const TopBlur: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 1150 536"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g filter="url(#filter0_f_15_6)">
      <circle
        cx="575"
        cy="-39"
        r="425"
        fill="#121416"
        fillOpacity="0.7"
      ></circle>
    </g>
    <defs>
      <filter
        id="filter0_f_15_6"
        width="1150"
        height="1150"
        x="0"
        y="-614"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        ></feBlend>
        <feGaussianBlur
          result="effect1_foregroundBlur_15_6"
          stdDeviation="75"
        ></feGaussianBlur>
      </filter>
    </defs>
  </svg>
);
