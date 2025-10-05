"use client";

import React, { useRef } from "react";
import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import AnimatedText from "@/app/components/AnimatedText";
import { useLenisContext } from "@/app/components/LenisProvider";
import { useLenisParallax } from "@/app/hooks/useLenisParallax";

interface GrowthHeaderProps {
  heading: RichTextField;
  subheading: RichTextField;
  body: RichTextField;
}

const GrowthHeader = ({ heading, subheading, body }: GrowthHeaderProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lenis = useLenisContext();

  const moveDistance =
    typeof window !== "undefined" && window.innerWidth < 768 ? 180 : 460;

  useLenisParallax({
    lenis,
    sectionRef,
    targetRef: bodyRef,
    startY: 100,
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
        <div className="mb-3 flex items-center gap-4 sm:pl-8">
          <div className="h-2 w-3.5 rounded-full border border-text-accent"></div>
          <span className="text-xs text-text-accent sm:text-sm">Growth</span>
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
          ref={bodyRef}
          className="flex flex-col sm:max-w-2/3 sm:pl-12 md:max-w-1/2"
        >
          {isFilled.richText(subheading) && (
            <PrismicRichText
              field={subheading}
              components={{
                heading4: ({ children }) => (
                  <AnimatedText
                    as="p"
                    className="grow pt-5 pr-3 text-base text-text-secondary md:text-lg"
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
