import React, { useRef } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import AnimatedText from "@/app/components/AnimatedText";
import { IntroSectionProps } from "@/slices/ProjectOverviewCards/types";

import { useLenisContext } from "@/app/components/LenisProvider";
import { useLenisParallax } from "@/app/hooks/useLenisParallax";

const IntroSection = ({ heading, description }: IntroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const lenis = useLenisContext();

  const moveDistance =
    typeof window !== "undefined" && window.innerWidth < 768 ? 250 : 310;

  useLenisParallax({
    lenis,
    sectionRef,
    targetRef: descRef,
    startY: 210,
    moveDistance,
    scrub: 0.5,
  });

  return (
    <section
      ref={sectionRef}
      className="intro bg-[linear-gradient(180deg,rgba(97,106,115,0.02)_0%,rgba(97,106,115,0.08)_100%)]"
    >
      <div className="mx-auto flex max-w-4xl flex-col">
        <AnimatedText
          as="div"
          splitType="block"
          animateOnScroll={true}
          scrollTriggerOptions={{
            start: "top bottom-=100",
            once: true,
          }}
        >
          <div className="mb-3 flex items-center gap-4 sm:pl-8">
            <div className="h-2 w-3.5 rounded-full border border-text-accent/80"></div>
            <span className="text-xs text-text-accent/80 sm:text-sm">Work</span>
          </div>
        </AnimatedText>

        <div className="flex flex-col sm:flex-row">
          {isFilled.richText(heading) && (
            <PrismicRichText
              field={heading}
              components={{
                heading2: ({ children }) => (
                  <AnimatedText
                    as="h2"
                    className="kerning-none mb-4 min-w-1/2 text-3xl tracking-tight text-text-primary sm:pl-8 md:text-5xl"
                    splitType="words"
                    gradient
                    animateOnScroll={true}
                    scrollTriggerOptions={{
                      start: "top bottom-=120",
                      once: true,
                    }}
                  >
                    {children}
                  </AnimatedText>
                ),
              }}
            />
          )}

          <div
            ref={descRef}
            className="grow pt-3 text-base text-text-tertiary will-change-transform sm:max-w-2/3 sm:pl-12 md:max-w-1/2 md:text-lg"
          >
            {isFilled.richText(description) && (
              <PrismicRichText field={description} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
