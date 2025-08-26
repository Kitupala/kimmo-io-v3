import React from "react";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import AnimatedText from "@/app/components/AnimatedText";
import { IntroSectionProps } from "@/slices/ProjectOverviewCards/types";

const IntroSection = ({ heading, description }: IntroSectionProps) => {
  return (
    <section id="work" className="intro intro-gradient">
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
            <div className="border-text-accent/80 h-2 w-3.5 rounded-full border"></div>
            <span className="text-text-accent/80 text-sm">Work</span>
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
                    className="text-text-primary kerning-none min-w-1/2 mb-4 text-3xl tracking-tight sm:pl-8 md:text-5xl"
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

          {isFilled.richText(description) && (
            <PrismicRichText
              field={description}
              components={{
                paragraph: ({ children }) => (
                  <AnimatedText
                    as="p"
                    className="text-text-tertiary sm:max-w-2/3 md:max-w-1/2 grow pt-3 text-base sm:pl-12 md:text-lg"
                    splitType="block"
                    lineHeight={1.3}
                    blur={8}
                    animateOnScroll={true}
                    scrollTriggerOptions={{
                      start: "top bottom-=150",
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
    </section>
  );
};

export default IntroSection;
