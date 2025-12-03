"use client";

import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import AnimatedText from "@/app/components/AnimatedText";
import Eyebrow from "@/app/components/Eyebrow";

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
        <Eyebrow text="Abilities" />
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

        {isFilled.richText(body) && (
          <PrismicRichText
            field={body}
            components={{
              paragraph: ({ children }) => (
                <AnimatedText
                  as="p"
                  className="grow pt-3 text-base text-text-tertiary text-pretty sm:max-w-2/3 sm:pl-12 md:max-w-1/2 md:text-lg"
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
