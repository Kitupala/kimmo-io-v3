"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface UseMagneticOptions {
  strength?: number;
  ease?: string;
  duration?: number;
  x?: boolean;
  y?: boolean;
}

export const useMagnetic = (options: UseMagneticOptions = {}) => {
  const {
    strength = 0.3,
    ease = "power3.out",
    duration = 0.6,
    x = true,
    y = true,
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const element = elementRef.current;
      if (!element) return;

      // Save original transform for reset
      const originalTransform = element.style.transform || "";

      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        gsap.to(element, {
          x: x ? distanceX * strength : 0,
          y: y ? distanceY * strength : 0,
          duration: duration,
          ease: ease,
          overwrite: true,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.4)",
          overwrite: true,
          onComplete: () => {
            element.style.transform = originalTransform;
          },
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);

        gsap.killTweensOf(element);
      };
    },
    { scope: elementRef, dependencies: [strength, ease, duration, x, y] },
  );

  return elementRef;
};
