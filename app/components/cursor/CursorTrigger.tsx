"use client";

import React from "react";
import { useMouseCursor } from "@/app/components/MouseCursorProvider";
import { cn } from "@/app/lib/utils";

interface CursorTriggerProps {
  children: React.ReactNode;
  state?: string;
  text?: string;
  hide?: boolean;
  classNames?: string;
}

export default function CursorTrigger({
  children,
  state = "-pointer",
  text,
  hide = false,
  classNames,
}: CursorTriggerProps) {
  const {
    addState,
    removeState,
    setText,
    removeText,
    hide: hideCursor,
    show,
  } = useMouseCursor();

  const handleMouseEnter = () => {
    if (state) {
      addState(state);
    }
    if (text) {
      setText(text);
    }
    if (hide) {
      hideCursor();
    }
  };

  const handleMouseLeave = () => {
    if (state) {
      removeState(state);
    }
    if (text) {
      removeText();
    }
    if (hide) {
      show();
    }
  };

  return (
    <div
      className={cn("", classNames)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
