import React from "react";
import { cn } from "@/app/lib/utils";

interface EyebrowProps {
  text: string;
  className?: string;
  withDot?: boolean;
}

const Eyebrow = ({ text, className, withDot = true }: EyebrowProps) => {
  return (
    <div
      className={cn(
        "mb-1 flex items-center gap-2 sm:mb-3 sm:gap-4 sm:pl-8",
        className,
      )}
    >
      {withDot && (
        <div className="h-1.5 w-2.5 rounded-full border border-text-accent/80 sm:h-2 sm:w-3.5" />
      )}
      <span className="text-xs text-text-accent/80 sm:text-sm">{text}</span>
    </div>
  );
};

export default Eyebrow;
