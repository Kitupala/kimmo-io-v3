"use client";

import React, { forwardRef } from "react";
import { useMagnetic } from "@/app/hooks/useMagnetic";

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  strength?: number;
  x?: boolean;
  y?: boolean;
}

// forwardRef component
const Magnetic = forwardRef<HTMLDivElement, MagneticProps>(
  (
    { children, className = "", strength = 0.3, x = true, y = true, ...props },
    ref,
  ) => {
    const magneticRef = useMagnetic({ strength, x, y });

    const handleRef = React.useCallback(
      (element: HTMLDivElement | null) => {
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }

        // Set the magnetic ref
        if (element && magneticRef && "current" in magneticRef) {
          magneticRef.current = element;
        }
      },
      [ref, magneticRef],
    );

    return (
      <div ref={handleRef} className={className} {...props}>
        {children}
      </div>
    );
  },
);

Magnetic.displayName = "Magnetic";

export default Magnetic;
