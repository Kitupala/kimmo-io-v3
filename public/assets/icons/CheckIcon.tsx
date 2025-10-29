import React from "react";
import { cn } from "@/app/lib/utils";

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
  className,
  ...props
}) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    className={cn("h-5 w-5", className)}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1
         0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8
         12.586l7.293-7.293a1 1 0 011.414 0z"
    />
  </svg>
);
