"use client";

import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import AnimatedText from "@/app/components/AnimatedText";

interface SkillsHeaderProps {
  heading: RichTextField;
  body: RichTextField;
}

const SkillsHeader = ({ heading, body }: SkillsHeaderProps) => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col">
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
          <span className="text-sm text-text-accent">Abilities</span>
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

        {isFilled.richText(body) && (
          <PrismicRichText
            field={body}
            components={{
              paragraph: ({ children }) => (
                <AnimatedText
                  as="p"
                  className="grow pt-3 text-base text-text-tertiary sm:max-w-2/3 sm:pl-12 md:max-w-1/2 md:text-lg"
                  splitType="block"
                  lineHeight={1.3}
                  duration={0.8}
                  blur={8}
                  animateOnScroll={true}
                  scrollTriggerOptions={{
                    start: "top bottom-=200",
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
  );
};

export default SkillsHeader;
