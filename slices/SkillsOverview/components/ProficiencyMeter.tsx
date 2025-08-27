"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/app/lib/utils";
import { NumberField } from "@prismicio/client";

interface GradientStop {
  offset: string;
  color: string;
}

interface ProficiencyMeterProps {
  score: NumberField;
  size?: number;
  strokeWidth?: number;
  textSize?: string;
  accentColor?: string;
  backgroundColor?: string;
  className?: string;
  delay?: number;
  useGradient?: boolean;
  gradientStops?: GradientStop[];
}

gsap.registerPlugin(ScrollTrigger);

const ProficiencyMeter: React.FC<ProficiencyMeterProps> = ({
  score,
  size = 100,
  strokeWidth = 6,
  textSize = "text-xl",
  accentColor = "var(--color-text-accent)",
  backgroundColor = "rgba(159, 159, 173, 0.1)",
  className = "",
  delay = 0,
  useGradient = false,
  gradientStops = [
    { offset: "0%", color: "var(--color-grid-line)" },
    { offset: "25%", color: "rgba(208, 214, 224, 0.8)" },
    { offset: "100%", color: "rgba(72, 79, 86, 0.2)" },
  ],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const counterRef = useRef<{ current: number }>({ current: 0 });
  const stRef = useRef<ScrollTrigger | null>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const gradientId = `proficiency-gradient-${Math.random().toString(36).substring(2, 9)}`;

  useGSAP(() => {
    if (!circleRef.current || !textRef.current || !containerRef.current) return;

    // Set initial states
    gsap.set(circleRef.current, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    gsap.set(textRef.current, {
      textContent: "0",
    });

    const tl = gsap.timeline({ paused: true });
    animationRef.current = tl;

    tl.to(circleRef.current, {
      strokeDashoffset: circumference - (score! / 100) * circumference,
      duration: 1,
      ease: "power3.out",
    });

    tl.to(
      counterRef.current,
      {
        current: score,
        duration: 1.2,
        ease: "power3.out",
        onUpdate: function () {
          if (textRef.current) {
            textRef.current.textContent = `${Math.round(counterRef.current.current)}`;
          }
        },
      },
      "<",
    );

    // Create ScrollTrigger with a small delay
    setTimeout(() => {
      stRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom-=100",
        onEnter: () => {
          setTimeout(() => {
            if (animationRef.current) {
              animationRef.current.play();
            }
          }, delay * 1000);
        },
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      if (stRef.current) {
        stRef.current.kill();
      }

      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) {
          st.kill();
        }
      });
    };
  }, [score, circumference, delay]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 transform"
      >
        {/* Define gradient */}
        {useGradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {gradientStops.map((stop, index) => (
                <stop
                  key={`${index}-${stop.offset}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                />
              ))}
            </linearGradient>
          </defs>
        )}

        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={useGradient ? `url(#${gradientId})` : accentColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width={size} height={size}>
          <text
            ref={textRef}
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="currentColor"
            className={cn("font-digital text-text-tertiary", textSize)}
          >
            0
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ProficiencyMeter;
