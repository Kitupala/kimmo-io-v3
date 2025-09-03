"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import MouseFollower from "mouse-follower";
import type Cursor from "mouse-follower";
import { gsap } from "@/app/lib/gsap";

import "mouse-follower/src/scss/index.scss";
import "../styles/mouse-follower-custom.css";

interface MouseCursorContextType {
  addState: (state: string) => void;
  removeState: (state: string) => void;
  setText: (text: string) => void;
  removeText: () => void;
  hide: () => void;
  show: () => void;
  setStick: (element: HTMLElement) => void;
  removeStick: () => void;
  setMedia: (element: HTMLElement) => void;
  removeMedia: () => void;
  setImg: (imgPath: string) => void;
  removeImg: () => void;
}

// Create the context with default values
const MouseCursorContext = createContext<MouseCursorContextType>({
  addState: () => {},
  removeState: () => {},
  setText: () => {},
  removeText: () => {},
  hide: () => {},
  show: () => {},
  setStick: () => {},
  removeStick: () => {},
  setMedia: () => {},
  removeMedia: () => {},
  setImg: () => {},
  removeImg: () => {},
});

// Custom hook to use the mouse cursor context
export const useMouseCursor = () => useContext(MouseCursorContext);

export default function MouseCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cursor, setCursor] = useState<Cursor | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

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

    setCursor(cursorInstance);

    return () => {
      if (cursorInstance) {
        cursorInstance.destroy();
      }
    };
  }, []);

  // Methods exposed to other components
  const addState = (state: string) => {
    if (cursor) {
      cursor.addState(state);
    }
  };

  const removeState = (state: string) => {
    if (cursor) {
      cursor.removeState(state);
    }
  };

  const setText = (text: string) => {
    if (cursor) {
      cursor.addState("-text");

      const textElement = document.querySelector(".mf-cursor-text");
      if (textElement) {
        textElement.textContent = text;
      }
    }
  };

  const removeText = () => {
    if (cursor) {
      cursor.removeState("-text");
    }
  };

  const hide = () => {
    if (cursor) {
      cursor.hide();
    }
  };

  const show = () => {
    if (cursor) {
      cursor.show();
    }
  };

  const setStick = (element: HTMLElement) => {
    if (cursor) {
      cursor.setStick(element);

      cursor.addState("-sticky");
    }
  };

  const removeStick = () => {
    if (cursor) {
      cursor.removeStick();

      cursor.removeState("-sticky");
    }
  };

  const setMedia = (element: HTMLElement) => {
    if (cursor) {
      cursor.setMedia(element);
    }
  };

  const removeMedia = () => {
    if (cursor) {
      cursor.removeMedia();
    }
  };

  const setImg = (imgPath: string) => {
    if (cursor) {
      const img = document.createElement("img");
      img.src = imgPath;
      img.alt = "";

      cursor.addState("-icon");
      cursor.setMedia(img);
    }
  };

  const removeImg = () => {
    if (cursor) {
      cursor.removeMedia();
      cursor.removeState("-icon");
    }
  };

  return (
    <MouseCursorContext.Provider
      value={{
        addState,
        removeState,
        setText,
        removeText,
        hide,
        show,
        setStick,
        removeStick,
        setMedia,
        removeMedia,
        setImg,
        removeImg,
      }}
    >
      {children}
    </MouseCursorContext.Provider>
  );
}
