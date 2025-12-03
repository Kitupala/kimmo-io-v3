"use client";

import { useRef, Suspense } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import Image from "next/image";
import FluidGlassLens from "@/slices/Hero/components/FluidGlassLens";
import ThreeHeroImage from "@/slices/Hero/components/ThreeHeroImage";
import { BRIGHTNESS_DIM_SETTINGS } from "@/app/constants";

const HeroImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "circ.inOut" },
        delay: 0.6,
      });

      gsap.set([line1Ref.current, line2Ref.current], {
        width: 0,
        filter: "brightness(0)",
      });

      const getResponsiveWidths = () => {
        const isMediumScreen = window.innerWidth < 768;
        const isSmallScreen = window.innerWidth < 500;
        return {
          line1: isSmallScreen ? "300px" : isMediumScreen ? "370px" : "460px",
          line2: isMediumScreen ? "100vw" : "920px",
        };
      };

      const { line1: line1FinalWidth, line2: line2FinalWidth } =
        getResponsiveWidths();

      // Lines animation
      tl.to(line1Ref.current, {
        width: line1FinalWidth,
        filter: "brightness(3)",
        duration: 0.7,
      }).to(
        line2Ref.current,
        {
          width: line2FinalWidth,
          filter: "brightness(3)",
          duration: 1,
        },
        "-=0.8",
      );

      // Circle animation
      tl.fromTo(
        circleRef.current,
        {
          opacity: 0,
          scale: 0.5,
          filter: "brightness(0)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "brightness(3)",
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // Image animation
      tl.fromTo(
        imageRef.current,
        { opacity: 0 },
        {
          opacity: 0.5,
          duration: 0.5,
          ease: "power3.inOut",
        },
        "-=0.6",
      );

      tl.fromTo(
        imageRef.current,
        { filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3",
      );

      tl.to(
        [circleRef.current, line1Ref.current, line2Ref.current],
        {
          filter: "brightness(1)",
          duration: BRIGHTNESS_DIM_SETTINGS.duration,
          ease: BRIGHTNESS_DIM_SETTINGS.ease,
        },
        "-=0.2",
      );

      const handleResize = () => {
        const { line1, line2 } = getResponsiveWidths();

        gsap.set(line1Ref.current, { width: line1 });
        gsap.set(line2Ref.current, { width: line2 });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      className="flex h-full w-full flex-col items-center"
      ref={containerRef}
    >
      {/* CIRCLE BORDER */}
      <div
        ref={circleRef}
        className="absolute -z-10 h-[360px] w-[360px] rounded-full border border-grid-line xs:mt-4 xs:h-[480px] xs:w-[480px] md:h-[594px] md:w-[594px]"
      />

      {/* FLUIDGLASSLENS WITH THE HERO IMAGE */}
      <div
        data-cursor="-hidden"
        className="lens-container absolute z-20 h-[360px] w-[360px] cursor-none xs:mt-4 xs:h-[480px] xs:w-[480px] md:h-[594px] md:w-[460px]"
      >
        <FluidGlassLens
          lensProps={{
            scale: 0.15,
            ior: 1.03,
            thickness: 2,
            chromaticAberration: 0.03,
          }}
        >
          <Suspense fallback={null}>
            <ThreeHeroImage src="/assets/images/hero.png" />
          </Suspense>
        </FluidGlassLens>
      </div>

      {/* HERO IMAGE FALLBACK */}
      <div className="absolute -z-30 h-[360px] w-[360px] xs:mt-4 xs:h-[480px] xs:w-[480px] md:h-[594px] md:w-[594px]">
        <Image
          ref={imageRef}
          src="/assets/images/hero.png"
          alt="hero image"
          fill
          sizes="(max-width: 768px) 360px, 480px, 594px"
          priority={true}
        />
      </div>

      {/* HORIZONTAL LINES */}
      <div className="absolute mt-[270px] flex flex-col items-center gap-32 xs:mt-[380px] xs:gap-42 md:mt-[470px] md:gap-50">
        <div
          ref={line1Ref}
          className="pointer-events-none z-30 h-[1px] bg-grid-line"
        />
        <div ref={line2Ref} className="h-[1px] bg-grid-line" />
      </div>
    </div>
  );
};

export default HeroImage;
