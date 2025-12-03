"use client";

import React, { useRef } from "react";
import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { useLenisContext } from "@/app/components/LenisProvider";
import { useLenisParallax } from "@/app/hooks/useLenisParallax";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import AnimatedText from "@/app/components/AnimatedText";
import Eyebrow from "@/app/components/Eyebrow";

interface GrowthHeaderProps {
  heading: RichTextField;
  subheading: RichTextField;
  body: RichTextField;
}

const GrowthHeader = ({ heading, subheading, body }: GrowthHeaderProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lenis = useLenisContext();
  const isMobile = useMediaQuery("(max-width: 639px)");

  const moveDistance = isMobile ? 0 : 460;
  const startY = isMobile ? 0 : 100;

  useLenisParallax({
    lenis,
    sectionRef,
    targetRef: bodyRef,
    startY: startY,
    moveDistance,
    scrub: 0.5,
  });

  return (
    <div ref={sectionRef} className="mx-auto flex max-w-4xl flex-col">
      <AnimatedText
        as="div"
        splitType="block"
        animateOnScroll={true}
        scrollTriggerOptions={{
          start: "top bottom-=80",
          once: true,
        }}
      >
        <Eyebrow text="Growth" />
      </AnimatedText>

      <div className="mb-12 flex flex-col sm:flex-row">
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
          ref={bodyRef}
          className="flex flex-col sm:max-w-2/3 sm:pl-8 md:max-w-1/2 lg:pl-12"
        >
          {isFilled.richText(subheading) && (
            <PrismicRichText
              field={subheading}
              components={{
                heading4: ({ children }) => (
                  <AnimatedText
                    as="p"
                    className="grow pt-5 pr-3 text-base text-pretty text-text-secondary md:text-lg"
                    splitType="block"
                    lineHeight={1.3}
                    duration={0.8}
                    blur={8}
                    animateOnScroll={true}
                    scrollTriggerOptions={{
                      start: "top bottom-=50",
                      once: true,
                    }}
                  >
                    {children}
                  </AnimatedText>
                ),
              }}
            />
          )}

          {isFilled.richText(body) && (
            <PrismicRichText
              field={body}
              components={{
                paragraph: ({ children }) => (
                  <AnimatedText
                    as="p"
                    className="grow pt-3 pr-3 text-base text-text-tertiary md:text-lg"
                    splitType="block"
                    lineHeight={1.3}
                    duration={0.8}
                    blur={8}
                    animateOnScroll={true}
                    scrollTriggerOptions={{
                      start: "top bottom-=50",
                      once: true,
                    }}
                  >
                    {children}
                  </AnimatedText>
                ),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GrowthHeader;
