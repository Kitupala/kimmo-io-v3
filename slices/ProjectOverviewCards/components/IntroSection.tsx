import React, { useRef } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { IntroSectionProps } from "@/slices/ProjectOverviewCards/types";

import { useLenisContext } from "@/app/components/LenisProvider";
import { useLenisParallax } from "@/app/hooks/useLenisParallax";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

import AnimatedText from "@/app/components/AnimatedText";
import Eyebrow from "@/app/components/Eyebrow";

const IntroSection = ({ heading, description }: IntroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const lenis = useLenisContext();
  const isMobile = useMediaQuery("(max-width: 639px)");

  const moveDistance = isMobile ? 250 : 310;

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
          <Eyebrow text="Work" />
        </AnimatedText>

        <div className="flex flex-col sm:flex-row">
          {isFilled.richText(heading) && (
            <PrismicRichText
              field={heading}
              components={{
                heading2: ({ children }) => (
                  <AnimatedText
                    as="h2"
                    className="kerning-none"
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
            className="grow pt-3 text-base text-pretty text-text-tertiary will-change-transform sm:max-w-2/3 sm:pl-12 md:max-w-1/2 md:text-lg"
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
