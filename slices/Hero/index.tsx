import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import GridLines from "@/app/components/GridLines";
import HeroImage from "@/slices/Hero/components/HeroImage";
import { Bounded } from "@/app/components/Bounded";
import AnimatedText from "@/app/components/AnimatedText";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <div id="home">
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="hero-gradient h-svh items-center text-center first:pt-22"
        id="hero"
      >
        <GridLines />
        <HeroImage />
        <div className="pointer-events-none relative z-20">
          {isFilled.richText(slice.primary.heading) && (
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading1: ({ children }) => (
                  <AnimatedText
                    gradient
                    as="h1"
                    className="z-30 my-8 w-full text-5xl font-light tracking-tight text-text-primary hover:pointer-events-auto xs:my-12 xs:text-7xl md:text-8xl md:leading-tight"
                    ease="power2.inOut"
                    duration={0.5}
                    delay={1}
                    lineHeight={1.1}
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
                    className="kerning-none text-base font-light text-text-secondary xs:text-xl md:text-3xl"
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
        </div>
      </Bounded>
    </div>
  );
};

export default Hero;
