"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/app/lib/utils";

import Image from "next/image";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] flex flex-col items-center"
    >
      {/*CIRCLE WITH HERO IMAGE */}
      <div className="w-[480px] h-[480px] md:w-[594px] md:h-[594px] mt-4 absolute rounded-full border border-grid-line">
        <Image
          src="/assets/images/hero.svg"
          alt="hero image"
          width={594}
          height={594}
          className="absolute -z-20"
        />
      </div>

      {/* HORIZONTAL LINES */}
      <div className="flex flex-col gap-42 md:gap-50 items-center absolute mt-[380px] md:mt-[470px]">
        <div className="w-[370px] md:w-[460px] h-[1px] bg-grid-line" />
        <div className="w-screen md:w-[920px] h-[1px] bg-grid-line" />
      </div>
    </div>
  );
};

export default Hero;
