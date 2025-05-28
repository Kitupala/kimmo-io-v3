"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Image from "next/image";
import { BRIGHTNESS_DIM_SETTINGS } from "@/app/constants";

gsap.registerPlugin(useGSAP);

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
        const isSmallerScreen = window.innerWidth < 768;
        return {
          line1: isSmallerScreen ? "370px" : "460px",
          line2: isSmallerScreen ? "100vw" : "920px",
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

      // Resize handler to update widths responsively
      const handleResize = () => {
        const { line1, line2 } = getResponsiveWidths();

        // Use GSAP to update widths so they maintain consistency with the animation
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
      {/* CIRCLE BORDER with brightness effect */}
      <div
        ref={circleRef}
        className="border-grid-line absolute -z-20 mt-4 h-[480px] w-[480px] rounded-full border md:h-[594px] md:w-[594px]"
      />

      {/* IMAGE CONTAINER */}
      <div className="absolute -z-30 mt-4 h-[480px] w-[480px] md:h-[594px] md:w-[594px]">
        <Image
          ref={imageRef}
          src="/assets/images/hero.svg"
          alt="hero image"
          fill
          sizes="(max-width: 768px) 480px, 594px"
          className="will-change-filter object-contain opacity-0"
        />
      </div>

      {/* HORIZONTAL LINES */}
      <div className="absolute mt-[380px] flex flex-col items-center gap-42 md:mt-[470px] md:gap-50">
        <div ref={line1Ref} className="bg-grid-line h-[1px]" />
        <div ref={line2Ref} className="bg-grid-line h-[1px]" />
      </div>
    </div>
  );
};

export default HeroImage;
