import React from "react";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import AnimatedText from "@/app/components/AnimatedText";
import { IntroSectionProps } from "@/slices/ProjectOverviewCards/types";

const IntroSection = ({ heading, description }: IntroSectionProps) => {
  return (
    <div>
      <section
        id="work"
        className="intro intro-gradient flex flex-col items-center justify-center space-y-10 text-center"
      >
        {isFilled.richText(heading) && (
          <PrismicRichText
            field={heading}
            components={{
              heading2: ({ children }) => (
                <AnimatedText
                  as="h2"
                  className="text-text-primary kerning-none xs:text-3xl text-2xl font-light tracking-tight md:text-5xl"
                  splitType="words"
                  gradient
                  animateOnScroll={true}
                  scrollTriggerOptions={{
                    start: "top bottom-=100",
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
                  className="text-text-tertiary max-w-2/3 md:max-w-1/2 text-sm font-light md:text-xl"
                  splitType="block"
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
      </section>
    </div>
  );
};

export default IntroSection;
