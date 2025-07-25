import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const ScrollHint = () => {
  const lineRef = useRef(null);

  useGSAP(() => {
    gsap.set(lineRef.current, {
      height: 0,
      opacity: 0,
      transformOrigin: "top center",
    });

    gsap
      .timeline({ repeat: -1 })
      .to(lineRef.current, {
        height: 30,
        opacity: 0.6,
        duration: 0.6,
        ease: "power3.in",
      })
      .to(
        lineRef.current,
        {
          height: 70,
          opacity: 1,
          duration: 2,
          ease: "power3.inOut",
        },
        "-=0.3",
      )
      .to(lineRef.current, {
        height: 0,
        opacity: 0,
        duration: 2.5,
        ease: "power3.inOut",
        delay: 0.3,
      });
  }, []);

  return (
    <div className="scroll-hint ml-12 flex h-12 items-start">
      <div
        ref={lineRef}
        className="bg-text-tertiary mr-2.5 h-0 w-px self-start"
      />
      <div className="w-18 mt-1 h-10 self-start opacity-80 md:w-24">
        <Image
          src="/assets/images/scrolltoexplore_bebas.svg"
          height={40}
          width={100}
          alt="Scroll to explore"
        />
      </div>
    </div>
  );
};

export default ScrollHint;
