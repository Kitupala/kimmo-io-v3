"use client";

import React, { useEffect, useRef } from "react";
import { useMouseCursor } from "@/app/components/MouseCursorProvider";

interface StickyCursorProps {
  children: React.ReactNode;
  targetSelector?: string;
  addState?: string; // Optional state to add on hover
}

export default function StickyCursor({
  children,
  targetSelector,
  addState,
}: StickyCursorProps) {
  const {
    setStick,
    removeStick,
    addState: addCursorState,
    removeState: removeCursorState,
  } = useMouseCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setupTarget = () => {
      if (targetSelector) {
        targetRef.current = document.querySelector(targetSelector);
      } else if (container.children.length > 0) {
        targetRef.current = container.children[0] as HTMLElement;
      }
    };

    setupTarget();

    const handleMouseEnter = () => {
      if (targetRef.current) {
        setStick(targetRef.current);
        if (addState) {
          addCursorState(addState);
        }
      }
    };

    const handleMouseLeave = () => {
      removeStick();
      if (addState) {
        removeCursorState(addState);
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);

      removeStick();
    };
  }, [
    setStick,
    removeStick,
    targetSelector,
    addState,
    addCursorState,
    removeCursorState,
  ]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {children}
    </div>
  );
}
