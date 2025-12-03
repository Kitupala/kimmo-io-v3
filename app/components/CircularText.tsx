"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { cn } from "@/app/lib/utils";
import Image from "next/image";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  classNames?: string;
  appearDelay?: number;
  image?: {
    src: string;
    alt: string;
    sizes?: string;
  };
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  classNames = "",
  appearDelay = 1,
  image,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spinTl = useRef<gsap.core.Tween | null>(null);

  const [radius, setRadius] = useState<number>(0);

  const letters = useMemo(() => Array.from(text), [text]);

  /* -------------------- ResizeObserver -------------------- */
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const size = el.offsetWidth;
      setRadius(size * 0.4);
    };

    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  /* ---------------------------- GSAP intro animation ---------------------------- */
  useGSAP(() => {
    const el = containerRef.current;
    const ring = ringRef.current;
    if (!el || !ring) return;

    gsap.set(el, { opacity: 0, scale: 0.6 });

    gsap.to(el, {
      opacity: 1,
      scale: 1,
      delay: appearDelay,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        spinTl.current = gsap.to(ring, {
          rotation: 360,
          duration: spinDuration,
          repeat: -1,
          ease: "none",
        });
      },
    });
  });

  /* -------------------------- Hover logic -------------------------- */
  const setSpinSpeed = (speed: number) => spinTl.current?.timeScale(speed);

  const handleHoverStart = () => {
    if (!spinTl.current) return;

    switch (onHover) {
      case "slowDown":
        setSpinSpeed(0.5);
        break;
      case "speedUp":
        setSpinSpeed(4);
        break;
      case "pause":
        setSpinSpeed(0);
        break;
      case "goBonkers":
        setSpinSpeed(20);
        gsap.to(ringRef.current, { scale: 0.9, duration: 0.15 });
        break;
      default:
        setSpinSpeed(1);
    }
  };

  const handleHoverEnd = () => {
    setSpinSpeed(1);
    gsap.to(ringRef.current, { scale: 1, duration: 0.3 });
  };

  return (
    <div
      ref={containerRef}
      className={cn("group pointer-events-auto relative", classNames)}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Center image */}
      {image && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="relative h-[60%] w-[60%]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={image.sizes || "(max-width: 768px) 60%, 100%"}
              className="ml-[5px] object-contain brightness-[60%] transition-all duration-300 group-hover:brightness-80 md:ml-1.5"
            />
          </div>
        </div>
      )}

      <div className="halo" />

      {/* Rotating ring */}
      <div ref={ringRef} className="absolute inset-0 will-change-transform">
        {letters.map((letter, i) => {
          const angle = (i / letters.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const rotate = (angle * 180) / Math.PI + 90;

          return (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 text-[10px] md:text-xs"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotate}deg)`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CircularText;
