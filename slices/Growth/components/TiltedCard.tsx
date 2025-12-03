"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";
import { ImageField } from "@prismicio/client";

interface TiltedCardProps {
  imageSrc?: React.ComponentProps<"img">["src"];
  imageField?: ImageField;
  mantra?: ImageField;
  altText?: string;
  captionText?: string;
  containerWidth?: React.CSSProperties["width"];
  imageWidth?: number;
  imageHeight?: number;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

export default function TiltedCard({
  imageSrc,
  imageField,
  mantra,
  altText = "Tilted card image",
  captionText = "",
  containerWidth = "100%",
  imageWidth = 500,
  imageHeight = 550,
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [lastY, setLastY] = useState(0);

  const aspectRatio =
    imageWidth && imageHeight ? `${imageWidth} / ${imageHeight}` : "1 / 1";

  useGSAP(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const tooltip = tooltipRef.current;

    if (!container || !card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
      const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

      gsap.to(card, {
        rotateX: rotationX,
        rotateY: rotationY,
        duration: 1.2,
        ease: "power1.out",
        overwrite: "auto",
      });

      if (tooltip) {
        const tooltipX = e.clientX - rect.left;
        const tooltipY = e.clientY - rect.top;

        const velocityY = offsetY - lastY;

        gsap.to(tooltip, {
          x: tooltipX,
          y: tooltipY,
          rotate: -velocityY * 0.6,
          duration: 0.3,
          ease: "power1.out",
          overwrite: "auto",
        });

        setLastY(offsetY);
      }
    };

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: scaleOnHover,
        duration: 1.2,
        ease: "power1.out",
        overwrite: "auto",
      });

      if (tooltip) {
        gsap.to(tooltip, {
          opacity: 1,
          duration: 0.6,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 1.2,
        ease: "power1.out",
        overwrite: "auto",
      });

      if (tooltip) {
        gsap.to(tooltip, {
          opacity: 0,
          rotate: 0,
          duration: 0.3,
          ease: "power1.out",
          overwrite: "auto",
        });
      }

      setLastY(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [scaleOnHover, rotateAmplitude, lastY]);

  return (
    <figure
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center"
      style={{
        width: containerWidth,
        perspective: "800px",
      }}
    >
      {showMobileWarning && (
        <div className="absolute -bottom-6 z-20 block text-center text-xs text-text-quaternary xs:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <div
        ref={cardRef}
        className="group fade-stripe card-details relative w-full max-w-[500px] overflow-hidden rounded-xl shadow-2xl shadow-grid-line/50 will-change-transform"
        style={{
          aspectRatio,
          transformStyle: "preserve-3d",
        }}
      >
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            alt={""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="scale-110 transform rounded-lg object-cover backdrop-blur-2xl transition-all duration-800 ease-in-out will-change-transform group-hover:scale-100"
            style={{ transform: "translateZ(0)" }}
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc as string}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="scale-110 transform rounded-lg object-cover backdrop-blur-2xl transition-all duration-800 ease-in-out will-change-transform group-hover:scale-100"
            style={{ transform: "translateZ(0)" }}
          />
        ) : null}

        {displayOverlayContent && overlayContent && (
          <>
            <div
              className="absolute top-0 left-0 z-10 scale-105 transform transition-all duration-800 ease-in-out will-change-transform group-hover:scale-115"
              style={{ transform: "translateZ(30px)" }}
            >
              {overlayContent}
            </div>
            {mantra && (
              <PrismicNextImage
                field={mantra}
                alt=""
                className="absolute top-0 left-0 z-20 transition-all duration-500 ease-in-out group-hover:brightness-150"
              />
            )}
          </>
        )}
      </div>

      {showTooltip && (
        <figcaption
          ref={tooltipRef}
          className="pointer-events-none absolute top-0 left-0 z-10 hidden rounded-sm bg-white px-2.5 py-1 text-[10px] text-[#2d2d2d] opacity-0 sm:block"
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  );
}
