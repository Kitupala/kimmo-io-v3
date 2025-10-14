"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

interface GlowAreaProps {
  size?: number;
  className?: string;
  verticalExtension?: number;
  horizontalExtension?: number;
  children?: React.ReactNode;
}

interface Bounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface Coordinates {
  x: number;
  y: number;
}

export const GlowArea = ({
  size = 300,
  className,
  verticalExtension = 300,
  horizontalExtension = 300,
  children,
  ...rest
}: GlowAreaProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const latestCoordsRef = useRef<Coordinates | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const isTrackingRef = useRef<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Reset glow position off-screen
  const resetGlowPosition = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.setProperty("--glow-x", "-99999px");
      elementRef.current.style.setProperty("--glow-y", "-99999px");
    }
  }, []);

  const updateGlow = useCallback(() => {
    if (latestCoordsRef.current && elementRef.current) {
      const { x, y } = latestCoordsRef.current;
      elementRef.current.style.setProperty("--glow-x", `${x}px`);
      elementRef.current.style.setProperty("--glow-y", `${y}px`);
      frameIdRef.current = null;
    }
  }, []);

  // Check if mouse pointer is within target bounds
  const isMouseWithinBounds = useCallback(
    (event: MouseEvent, bounds: Bounds) =>
      event.clientX >= bounds.left - horizontalExtension &&
      event.clientX <= bounds.right + horizontalExtension &&
      event.clientY >= bounds.top - verticalExtension &&
      event.clientY <= bounds.bottom + verticalExtension,
    [verticalExtension, horizontalExtension],
  );

  useEffect(() => {
    resetGlowPosition();

    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (!elementRef.current) return;

      const elementBounds = elementRef.current.getBoundingClientRect();
      const isWithinBounds = isMouseWithinBounds(event, elementBounds);

      if (isWithinBounds) {
        if (!isTrackingRef.current) {
          isTrackingRef.current = true;
          setHasInteracted(true);
        }

        // Calculate constrained Y position
        const constrainedX = Math.max(
          -horizontalExtension,
          Math.min(
            event.clientX - elementBounds.left,
            elementBounds.width + horizontalExtension,
          ),
        );

        const constrainedY = Math.max(
          -verticalExtension,
          Math.min(
            event.clientY - elementBounds.top,
            elementBounds.height + verticalExtension,
          ),
        );

        // Update tracked coordinates
        latestCoordsRef.current = {
          x: constrainedX,
          y: constrainedY,
        };

        // Schedule update if not already pending
        if (!frameIdRef.current) {
          frameIdRef.current = requestAnimationFrame(updateGlow);
        }
      } else if (isTrackingRef.current) {
        isTrackingRef.current = false;
        resetGlowPosition();
      }
    };

    const handleWindowLeave = () => {
      if (isTrackingRef.current) {
        isTrackingRef.current = false;
        resetGlowPosition();
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseleave", handleWindowLeave);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseleave", handleWindowLeave);

      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [
    isMouseWithinBounds,
    resetGlowPosition,
    updateGlow,
    verticalExtension,
    horizontalExtension,
  ]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isTrackingRef.current) {
      isTrackingRef.current = true;
      setHasInteracted(true);
    }

    const elementBounds = event.currentTarget.getBoundingClientRect();
    latestCoordsRef.current = {
      x: event.clientX - elementBounds.left,
      y: event.clientY - elementBounds.top,
    };

    if (!frameIdRef.current) {
      frameIdRef.current = requestAnimationFrame(updateGlow);
    }
  };

  return (
    <div
      ref={elementRef}
      style={
        {
          position: "relative",
          "--glow-size": `${size}px`,
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
      className={cn(className, {
        "has-interacted": hasInteracted,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};

GlowArea.displayName = "GlowArea";

interface GlowProps {
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Glow = ({
  color = "var(--grid-line-medium)",
  className,
  children,
  ...rest
}: GlowProps) => {
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    element.current?.style.setProperty(
      "--glow-top",
      `${element.current?.offsetTop}px`,
    );
    element.current?.style.setProperty(
      "--glow-left",
      `${element.current?.offsetLeft}px`,
    );
  }, []);

  return (
    <div ref={element} className={cn("relative h-full", className)}>
      <div
        {...rest}
        style={{
          backgroundImage: `radial-gradient(
            var(--glow-size) var(--glow-size) at calc(var(--glow-x, -99999px) - var(--glow-left, 0px))
            calc(var(--glow-y, -99999px) - var(--glow-top, 0px)),
            ${color} 0%,
            transparent 100%
          )`,
        }}
        className={cn(
          "pointer-events-none absolute inset-0 mix-blend-multiply after:absolute after:rounded-[inherit] after:bg-[#08090AF2] after:content-[''] dark:mix-blend-lighten",
          className,
        )}
      ></div>
      {children}
    </div>
  );
};

Glow.displayName = "Glow";
