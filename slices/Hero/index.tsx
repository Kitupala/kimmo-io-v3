import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import GridLines from "@/app/components/GridLines";
import HeroImage from "@/slices/Hero/HeroImage";
import { Bounded } from "@/app/components/Bounded";
import AnimatedText from "@/app/components/AnimatedText";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="first:pt-22"
    >
      <GridLines />
      <HeroImage />

      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => (
              <AnimatedText
                gradient
                as="h1"
                className="text-text-primary my-12 w-full text-6xl font-light tracking-tight md:text-8xl md:leading-tight"
                ease="power2.inOut"
                duration={0.5}
                delay={1}
                lineHeight={1.2}
              >
                {children}
              </AnimatedText>
            ),
          }}
        />
      )}

      {isFilled.richText(slice.primary.body) && (
        <PrismicRichText
          field={slice.primary.body}
          components={{
            heading2: ({ children }) => (
              <AnimatedText
                as="h2"
                className="text-text-secondary kerning-none mb-80 text-xl font-light md:text-3xl lg:mb-[390px]"
                splitType="words"
                delay={1.6}
                lineHeight={1.4}
              >
                {children}
              </AnimatedText>
            ),
          }}
        />
      )}
    </Bounded>
  );
};

export default Hero;
