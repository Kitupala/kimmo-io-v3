"use client";

import React, { useRef, ReactNode, ElementType } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/app/lib/utils";

gsap.registerPlugin(SplitText);

interface AnimatedTextProps<T extends ElementType = "div"> {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitType?: "words" | "chars" | "lines" | "block";
  y?: number;
  blur?: number;
  ease?: string;
  lineHeight?: string | number;
  gradient?: boolean;
  [key: string]: unknown;
}

function AnimatedText<T extends ElementType = "div">({
  as,
  children,
  className = "",
  delay = 0.5,
  duration = 0.6,
  stagger = 0.08,
  splitType = "words",
  y = 15,
  blur = 12,
  ease = "power2.out",
  lineHeight = 1.4,
  gradient = false,
  ...rest
}: AnimatedTextProps<T>) {
  const Component = as || "div";
  const textRef = useRef<HTMLDivElement | null>(null);
  const splitInstance = useRef<SplitText | null>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      // If gradient is provided and not in block mode, always use lines for split type
      let effectiveSplitType = splitType;
      if (gradient && splitType !== "block") {
        effectiveSplitType = "lines";
      }

      const tl = gsap.timeline({ delay });

      // For block animation, animate the container directly
      if (effectiveSplitType === "block") {
        gsap.set(textRef.current, {
          opacity: 0,
          y,
          filter: `blur(${blur}px)`,
        });

        tl.to(textRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          ease,
        });

        if (gradient) {
          textRef.current.classList.add("text-gradient");
        }
      } else {
        splitInstance.current = new SplitText(textRef.current, {
          type: effectiveSplitType,
        });
        const elements = splitInstance.current[effectiveSplitType];

        gsap.set(elements, {
          opacity: 0,
          y,
          filter: `blur(${blur}px)`,
        });

        if (
          gradient &&
          Array.isArray(elements) &&
          effectiveSplitType === "lines"
        ) {
          elements.forEach((line: Element) => {
            if (line instanceof HTMLElement) {
              line.classList.add("text-gradient");
            }
          });
        }

        tl.to(elements, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          stagger,
          ease,
        });
      }

      return () => {
        tl.kill();
        splitInstance.current?.revert();
      };
    },
    {
      dependencies: [
        children,
        delay,
        duration,
        stagger,
        splitType,
        y,
        blur,
        ease,
        gradient,
      ],
      scope: textRef,
    },
  );

  const componentStyle = {
    lineHeight,
    ...((rest.style ?? {}) as React.CSSProperties),
  };

  const combinedClassName = cn(
    className,
    gradient && (splitType === "block" || splitType === "lines")
      ? "text-gradient"
      : "",
  );

  return (
    <Component
      ref={textRef}
      className={combinedClassName}
      style={componentStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default AnimatedText;
