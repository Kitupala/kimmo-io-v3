// "use client";
//
// import React, { ElementType, ReactNode, useRef } from "react";
// import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/app/lib/gsap";
// import { cn } from "@/app/lib/utils";
//
// interface AnimatedTextProps<T extends ElementType = "div"> {
//   as?: T;
//   children: ReactNode;
//   className?: string;
//   delay?: number;
//   duration?: number;
//   stagger?: number;
//   splitType?: "words" | "chars" | "lines" | "block";
//   y?: number;
//   blur?: number;
//   ease?: string;
//   lineHeight?: string | number;
//   gradient?: boolean;
//   animateOnScroll?: boolean;
//   scrollTriggerOptions?: {
//     start?: string;
//     end?: string;
//     once?: boolean;
//     markers?: boolean;
//     toggleActions?: string;
//   };
//   [key: string]: unknown;
// }
//
// function AnimatedText<T extends ElementType = "div">({
//   as,
//   children,
//   className = "",
//   delay = 0.5,
//   duration = 0.6,
//   stagger = 0.08,
//   splitType = "words",
//   y = 15,
//   blur = 12,
//   ease = "power2.out",
//   lineHeight = 1.4,
//   gradient = false,
//   animateOnScroll = false,
//   scrollTriggerOptions = {
//     start: "top bottom",
//     once: true,
//     markers: false,
//     toggleActions: "play none none none",
//   },
//   ...rest
// }: AnimatedTextProps<T>) {
//   const Component = as || "div";
//   const textRef = useRef<HTMLDivElement | null>(null);
//   const splitInstance = useRef<SplitText | null>(null);
//   const timeline = useRef<gsap.core.Timeline | null>(null);
//
//   useGSAP(
//     () => {
//       const setupAnimation = () => {
//         if (!textRef.current) return;
//         // If gradient is provided and not in block mode, always use lines for split type
//         let effectiveSplitType = splitType;
//         if (gradient && splitType !== "block") {
//           effectiveSplitType = "lines";
//         }
//
//         const tl = gsap.timeline({
//           paused: animateOnScroll,
//         });
//         timeline.current = tl;
//
//         // For block animation, animate the container directly
//         if (effectiveSplitType === "block") {
//           gsap.set(textRef.current, {
//             opacity: 0,
//             y,
//             filter: `blur(${blur}px)`,
//           });
//
//           tl.to(textRef.current, {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration,
//             ease,
//           });
//
//           if (gradient) {
//             textRef.current.classList.add("text-gradient");
//           }
//         } else {
//           splitInstance.current = new SplitText(textRef.current, {
//             type: effectiveSplitType,
//           });
//
//           const elements = splitInstance.current[effectiveSplitType];
//
//           gsap.set(elements, {
//             opacity: 0,
//             y,
//             filter: `blur(${blur}px)`,
//           });
//
//           if (
//             gradient &&
//             Array.isArray(elements) &&
//             effectiveSplitType === "lines"
//           ) {
//             elements.forEach((line: Element) => {
//               if (line instanceof HTMLElement) {
//                 line.classList.add("text-gradient");
//               }
//             });
//           }
//
//           tl.to(elements, {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration,
//             stagger,
//             ease,
//           });
//         }
//
//         // If using scroll trigger, set it up here
//         if (animateOnScroll) {
//           ScrollTrigger.refresh();
//
//           ScrollTrigger.create({
//             trigger: textRef.current,
//             start: scrollTriggerOptions.start || "top bottom",
//             end: scrollTriggerOptions.end || "bottom top",
//             once: scrollTriggerOptions.once || false,
//             markers: scrollTriggerOptions.markers || false,
//             toggleActions:
//               scrollTriggerOptions.toggleActions || "play none none none",
//             animation: tl,
//             invalidateOnRefresh: true,
//           });
//         } else {
//           // If not using scroll trigger, play the timeline immediately with delay
//           tl.delay(delay).play();
//         }
//       };
//
//       // Use a small timeout to ensure the DOM is fully rendered in production
//       if (typeof window !== "undefined") {
//         setTimeout(setupAnimation, 100);
//       }
//
//       return () => {
//         if (timeline.current) timeline.current.kill();
//         if (splitInstance.current) splitInstance.current.revert();
//         if (animateOnScroll) {
//           ScrollTrigger.getAll().forEach((st) => {
//             if (st.vars.trigger === textRef.current) {
//               st.kill();
//             }
//           });
//         }
//       };
//     },
//     {
//       dependencies: [
//         children,
//         delay,
//         duration,
//         stagger,
//         splitType,
//         y,
//         blur,
//         ease,
//         gradient,
//         animateOnScroll,
//         JSON.stringify(scrollTriggerOptions),
//       ],
//       scope: textRef,
//     },
//   );
//
//   const componentStyle = {
//     lineHeight,
//     ...((rest.style ?? {}) as React.CSSProperties),
//   };
//
//   const combinedClassName = cn(
//     className,
//     gradient && (splitType === "block" || splitType === "lines")
//       ? "text-gradient"
//       : "",
//   );
//
//   return (
//     <Component
//       ref={textRef}
//       className={combinedClassName}
//       style={componentStyle}
//       {...rest}
//     >
//       {children}
//     </Component>
//   );
// }
//
// export default AnimatedText;
//

// "use client";
//
// import React, {
//   ElementType,
//   ReactNode,
//   useRef,
//   ComponentPropsWithoutRef,
// } from "react";
// import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/app/lib/gsap";
// import { cn } from "@/app/lib/utils";
//
// interface AnimatedTextOwnProps<T extends ElementType = "div"> {
//   as?: T;
//   children: ReactNode;
//   className?: string;
//   delay?: number;
//   duration?: number;
//   stagger?: number;
//   splitType?: "words" | "chars" | "lines" | "block";
//   y?: number;
//   blur?: number;
//   ease?: string;
//   lineHeight?: string | number;
//   gradient?: boolean;
//   animateOnScroll?: boolean;
//   scrollTriggerOptions?: {
//     start?: string;
//     end?: string;
//     once?: boolean;
//     markers?: boolean;
//     toggleActions?: string;
//   };
// }
//
// type AnimatedTextProps<T extends ElementType = "div"> =
//   AnimatedTextOwnProps<T> &
//     Omit<ComponentPropsWithoutRef<T>, keyof AnimatedTextOwnProps<T>>;
//
// function AnimatedText<T extends ElementType = "div">({
//   as,
//   children,
//   className = "",
//   delay = 0.5,
//   duration = 0.6,
//   stagger = 0.08,
//   splitType = "words",
//   y = 15,
//   blur = 12,
//   ease = "power2.out",
//   lineHeight = 1.4,
//   gradient = false,
//   animateOnScroll = false,
//   scrollTriggerOptions = {
//     start: "top bottom",
//     once: true,
//     markers: false,
//     toggleActions: "play none none none",
//   },
//   ...rest
// }: AnimatedTextProps<T>) {
//   const Component = as || ("div" as ElementType);
//   const textRef = useRef<HTMLElement | null>(null);
//   const splitInstance = useRef<SplitText | null>(null);
//   const timeline = useRef<gsap.core.Timeline | null>(null);
//
//   useGSAP(
//     () => {
//       const setupAnimation = () => {
//         if (!textRef.current) return;
//
//         // If gradient is provided and not in block mode, always use lines for split type
//         let effectiveSplitType = splitType;
//         if (gradient && splitType !== "block") {
//           effectiveSplitType = "lines";
//         }
//
//         const tl = gsap.timeline({
//           paused: animateOnScroll,
//         });
//         timeline.current = tl;
//
//         // For block animation, animate the container directly
//         if (effectiveSplitType === "block") {
//           gsap.set(textRef.current, {
//             opacity: 0,
//             y,
//             filter: `blur(${blur}px)`,
//           });
//
//           tl.to(textRef.current, {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration,
//             ease,
//           });
//
//           if (gradient) {
//             textRef.current.classList.add("text-gradient");
//           }
//         } else {
//           splitInstance.current = new SplitText(textRef.current, {
//             type: effectiveSplitType,
//           });
//
//           const elements = splitInstance.current[effectiveSplitType];
//
//           gsap.set(elements, {
//             opacity: 0,
//             y,
//             filter: `blur(${blur}px)`,
//           });
//
//           if (
//             gradient &&
//             Array.isArray(elements) &&
//             effectiveSplitType === "lines"
//           ) {
//             elements.forEach((line: Element) => {
//               if (line instanceof HTMLElement) {
//                 line.classList.add("text-gradient");
//               }
//             });
//           }
//
//           tl.to(elements, {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration,
//             stagger,
//             ease,
//           });
//         }
//
//         // If using scroll trigger, set it up here
//         if (animateOnScroll) {
//           ScrollTrigger.refresh();
//
//           ScrollTrigger.create({
//             trigger: textRef.current,
//             start: scrollTriggerOptions.start || "top bottom",
//             end: scrollTriggerOptions.end || "bottom top",
//             once: scrollTriggerOptions.once || false,
//             markers: scrollTriggerOptions.markers || false,
//             toggleActions:
//               scrollTriggerOptions.toggleActions || "play none none none",
//             animation: tl,
//             invalidateOnRefresh: true,
//           });
//         } else {
//           // If not using scroll trigger, play the timeline immediately with delay
//           tl.delay(delay).play();
//         }
//       };
//
//       // Use a small timeout to ensure the DOM is fully rendered in production
//       if (typeof window !== "undefined") {
//         setTimeout(setupAnimation, 100);
//       }
//
//       return () => {
//         if (timeline.current) timeline.current.kill();
//         if (splitInstance.current) splitInstance.current.revert();
//         if (animateOnScroll) {
//           ScrollTrigger.getAll().forEach((st) => {
//             if (st.vars.trigger === textRef.current) {
//               st.kill();
//             }
//           });
//         }
//       };
//     },
//     {
//       dependencies: [
//         children,
//         delay,
//         duration,
//         stagger,
//         splitType,
//         y,
//         blur,
//         ease,
//         gradient,
//         animateOnScroll,
//         JSON.stringify(scrollTriggerOptions),
//       ],
//       scope: textRef,
//     },
//   );
//
//   const componentStyle: React.CSSProperties = {
//     lineHeight,
//     ...((rest.style as React.CSSProperties) || {}),
//   };
//
//   const combinedClassName = cn(
//     className,
//     gradient && (splitType === "block" || splitType === "lines")
//       ? "text-gradient"
//       : "",
//   );
//
//   const componentProps = {
//     ref: textRef,
//     className: combinedClassName,
//     style: componentStyle,
//     ...rest,
//   } as ComponentPropsWithoutRef<T> & {
//     ref: React.RefObject<HTMLElement | null>;
//     className: string;
//     style: React.CSSProperties;
//   };
//
//   return React.createElement(Component, componentProps, children);
// }
//
// export default AnimatedText;

"use client";

import React, { ReactNode, useRef } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/app/lib/gsap";
import { cn } from "@/app/lib/utils";

interface AnimatedTextProps {
  as?: React.ElementType;
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
  animateOnScroll?: boolean;
  scrollTriggerOptions?: {
    start?: string;
    end?: string;
    once?: boolean;
    markers?: boolean;
    toggleActions?: string;
  };
  [key: string]: unknown;
}

function AnimatedText({
  as: Component = "div",
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
  animateOnScroll = false,
  scrollTriggerOptions = {
    start: "top bottom",
    once: true,
    markers: false,
    toggleActions: "play none none none",
  },
  ...rest
}: AnimatedTextProps) {
  const textRef = useRef<HTMLElement | null>(null);
  const splitInstance = useRef<SplitText | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const setupAnimation = () => {
        if (!textRef.current) return;

        // If gradient is provided and not in block mode, always use lines for split type
        let effectiveSplitType = splitType;
        if (gradient && splitType !== "block") {
          effectiveSplitType = "lines";
        }

        const tl = gsap.timeline({
          paused: animateOnScroll,
        });
        timeline.current = tl;

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

        // If using scroll trigger, set it up here
        if (animateOnScroll) {
          ScrollTrigger.refresh();

          ScrollTrigger.create({
            trigger: textRef.current,
            start: scrollTriggerOptions.start || "top bottom",
            end: scrollTriggerOptions.end || "bottom top",
            once: scrollTriggerOptions.once || false,
            markers: scrollTriggerOptions.markers || false,
            toggleActions:
              scrollTriggerOptions.toggleActions || "play none none none",
            animation: tl,
            invalidateOnRefresh: true,
          });
        } else {
          // If not using scroll trigger, play the timeline immediately with delay
          tl.delay(delay).play();
        }
      };

      // Use a small timeout to ensure the DOM is fully rendered in production
      if (typeof window !== "undefined") {
        setTimeout(setupAnimation, 100);
      }

      return () => {
        if (timeline.current) timeline.current.kill();
        if (splitInstance.current) splitInstance.current.revert();
        if (animateOnScroll) {
          ScrollTrigger.getAll().forEach((st) => {
            if (st.vars.trigger === textRef.current) {
              st.kill();
            }
          });
        }
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
        animateOnScroll,
        JSON.stringify(scrollTriggerOptions),
      ],
      scope: textRef,
    },
  );

  const componentStyle: React.CSSProperties = {
    lineHeight,
    ...((rest.style as React.CSSProperties) || {}),
  };

  const combinedClassName = cn(
    className,
    gradient && (splitType === "block" || splitType === "lines")
      ? "text-gradient"
      : "",
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style, ...filteredRest } = rest;

  return React.createElement(
    Component,
    {
      ref: textRef,
      className: combinedClassName,
      style: componentStyle,
      ...filteredRest,
    },
    children,
  );
}

export default AnimatedText;
