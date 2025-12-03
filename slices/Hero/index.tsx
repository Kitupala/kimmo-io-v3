import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import GridLines from "@/app/components/GridLines";
import HeroImage from "@/slices/Hero/components/HeroImage";
import { Bounded } from "@/app/components/Bounded";
import AnimatedText from "@/app/components/AnimatedText";
import CircularText from "@/app/components/CircularText";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero-gradient h-svh text-center first:pt-[35%] xs:first:pt-22"
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
                  className="z-30 mt-12 w-full text-3xl tracking-tight text-text-primary hover:pointer-events-auto xs:mt-26 xs:text-4xl md:text-6xl"
                  ease="power2.inOut"
                  duration={0.4}
                  delay={1.2}
                  lineHeight={1.2}
                  stagger={0.35}
                >
                  {children}
                </AnimatedText>
              ),
            }}
          />
        )}

        <CircularText
          text="Engineer❖Frontend❖"
          onHover="slowDown"
          spinDuration={25}
          appearDelay={4}
          classNames="justify-self-center mt-64 xs:absolute xs:left-12 z-50 xs:-bottom-[320px] uppercase w-28 h-28 md:w-36 md:h-36 hover:text-text-tertiary transition-colors duration-300 text-text-quaternary"
          image={{
            src: "/assets/images/monogram.png",
            alt: "K-monogram",
          }}
        />
      </div>
    </Bounded>
  );
};

export default Hero;
