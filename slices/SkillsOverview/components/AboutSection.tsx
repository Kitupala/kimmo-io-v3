import React from "react";
import Image from "next/image";

import { Content, isFilled } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";

import AnimatedText from "@/app/components/AnimatedText";
import { Glow, GlowArea } from "@/app/components/Glow";
import Magnetic from "@/app/components/Magnetic";
import { CheckIcon } from "@/public/assets/icons/CheckIcon";

const AboutSection = ({ slice }: { slice: Content.SkillsOverviewSlice }) => {
  return (
    <GlowArea className="hero-gradient my-22 flex flex-col divide-grid-line border-y border-grid-line bg-background sm:flex-row sm:divide-x">
      <div className="flex-3">
        <Magnetic
          strength={0.4}
          className="absolute -top-12 right-0 z-10 mt-6 size-24 rounded-full border border-grid-line-medium bg-background mask-b-from-60% p-1 md:-right-4 md:size-30"
          data-cursor="-hidden"
        >
          <div className="size-full overflow-hidden rounded-full">
            <Image
              src="/assets/images/selfie.webp"
              alt="Selfie"
              width={200}
              height={200}
              className="mb-4 inline-block size-full origin-center rounded-full opacity-65 mix-blend-plus-darker grayscale transition-all duration-200 hover:scale-110"
            />
          </div>
        </Magnetic>

        <Glow className="m-1 mb-3 pt-12 after:inset-0 sm:px-12 sm:pb-16 sm:after:inset-px">
          <div className="flex flex-col">
            {isFilled.richText(slice.primary.about_subheading) && (
              <PrismicRichText
                field={slice.primary.about_subheading}
                components={
                  {
                    heading4: ({ children }) => (
                      <AnimatedText
                        as="h4"
                        className="mb-4 text-xl text-text-secondary"
                        splitType="words"
                        animateOnScroll={true}
                        scrollTriggerOptions={{
                          start: "top bottom-=20",
                          once: true,
                        }}
                      >
                        {children}
                      </AnimatedText>
                    ),
                  } satisfies JSXMapSerializer
                }
              />
            )}

            {isFilled.richText(slice.primary.about_subsection) && (
              <PrismicRichText
                field={slice.primary.about_subsection}
                components={{
                  paragraph: ({ children }) => (
                    <AnimatedText
                      as="p"
                      className="text-base text-pretty text-text-tertiary will-change-transform md:text-lg"
                      splitType="block"
                      lineHeight={1.3}
                      blur={8}
                      animateOnScroll={true}
                      scrollTriggerOptions={{
                        start: "top bottom-=20",
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
        </Glow>
      </div>

      <div className="flex-2">
        <Glow className="m-1 mb-3 pt-4 pb-16 after:inset-0 sm:px-12 sm:pt-12 sm:after:inset-px">
          <>
            {isFilled.richText(slice.primary.ss_subheading) && (
              <PrismicRichText
                field={slice.primary.ss_subheading}
                components={
                  {
                    heading4: ({ children }) => (
                      <AnimatedText
                        as="h4"
                        className="mb-4 text-xl text-text-secondary will-change-transform"
                        splitType="words"
                        animateOnScroll={true}
                        scrollTriggerOptions={{
                          start: "top bottom-=20",
                          once: true,
                        }}
                      >
                        {children}
                      </AnimatedText>
                    ),
                  } satisfies JSXMapSerializer
                }
              />
            )}

            {isFilled.richText(slice.primary.ss_sub_subheading) && (
              <PrismicRichText
                field={slice.primary.ss_sub_subheading}
                components={
                  {
                    heading5: ({ children }) => (
                      <AnimatedText
                        as="h4"
                        className="mb-1 text-base text-pretty text-text-tertiary md:text-lg"
                        splitType="block"
                        lineHeight={1.3}
                        blur={8}
                        animateOnScroll={true}
                        scrollTriggerOptions={{
                          start: "top bottom-=20",
                          once: true,
                        }}
                      >
                        {children}
                      </AnimatedText>
                    ),
                  } satisfies JSXMapSerializer
                }
              />
            )}

            <ul className="mt-2 flex flex-col text-base text-text-tertiary lowercase italic md:text-lg [&>li]:mr-3 [&>li>span]:text-text-accent">
              {isFilled.keyText(slice.primary.ss_subsection) &&
                slice.primary.ss_subsection.split(",").map((item, index) => {
                  const softSkill = item.trim();

                  return (
                    <AnimatedText
                      as="li"
                      key={`item-${index}`}
                      className="mr-3 flex items-center"
                      splitType="block"
                      lineHeight={1.5}
                      animateOnScroll={true}
                      stagger={0.03}
                      delay={0.05 * index}
                      scrollTriggerOptions={{
                        start: "top bottom-=20",
                        once: true,
                      }}
                    >
                      <span>
                        <CheckIcon className="mr-1 h-6 w-6 text-grid-line-bright" />
                      </span>
                      {softSkill}
                    </AnimatedText>
                  );
                })}
            </ul>
          </>
        </Glow>
      </div>
    </GlowArea>
  );
};

export default AboutSection;
