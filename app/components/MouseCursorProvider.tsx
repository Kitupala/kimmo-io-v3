"use client";

import React, { useEffect } from "react";
import MouseFollower from "mouse-follower";

import { gsap } from "@/app/lib/gsap";

import "mouse-follower/src/scss/index.scss";
import "../styles/mouse-follower-custom.css";

export default function MouseCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don't initialize on touch devices
    const hasMousePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasMousePointer) return;

    MouseFollower.registerGSAP(gsap);
    const cursorInstance = new MouseFollower({
      speed: 0.6,
      className: "mf-cursor",
      innerClassName: "mf-cursor-inner",
      textClassName: "mf-cursor-text",
      mediaClassName: "mf-cursor-media",
      mediaBoxClassName: "mf-cursor-media-box",
      skewingDelta: 0.1,
      skewingDeltaMax: 0.15,
      ease: "expo.out",
    });

    return () => {
      cursorInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
