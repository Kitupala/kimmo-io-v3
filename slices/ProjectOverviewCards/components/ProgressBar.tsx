import { ProgressBarProps } from "@/slices/ProjectOverviewCards/types";
import { cn } from "@/app/lib/utils";

const ProgressBar = ({
  ref,
  innerRef,
  progress,
  isLastCardVisible,
  isInNextSection,
}: ProgressBarProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "scroll-progress bg-grid-line-bright w-46 z-50 h-[1px] overflow-hidden rounded-full transition-none",
        isLastCardVisible && !isInNextSection
          ? "right-18 fixed bottom-16"
          : isInNextSection
            ? "right-18 -bottom-23.5 absolute"
            : "right-18 fixed bottom-16",
      )}
    >
      <div
        ref={innerRef}
        className="bg-text-accent h-full"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;

// components/ProgressBar.tsx
// import React, { forwardRef } from "react";
// import { cn } from "@/app/lib/utils";
// import { ProgressBarProps } from "../types";
//
// const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
//   ({ progress, isLastCardVisible, isInNextSection, innerRef }, ref) => {
//     console.log("ProgressBar rendered:", {
//       progress,
//       isLastCardVisible,
//       isInNextSection,
//     });
//
//     return (
//       <div
//         ref={ref}
//         className={cn(
//           "scroll-progress bg-grid-line z-40 h-[1px] w-36 overflow-hidden rounded-full backdrop-blur-md transition-none",
//           isLastCardVisible && !isInNextSection
//             ? "fixed bottom-20 right-20"
//             : isInNextSection
//               ? "absolute -bottom-20 right-20"
//               : "fixed bottom-20 right-20 opacity-0", // Ensure visibility
//         )}
//         style={{ background: "rgba(255, 0, 0, 0.3)" }} // Temporary debugging style
//       >
//         <div
//           ref={innerRef}
//           className="bg-foreground h-full"
//           style={{ width: `${progress * 100}%` }}
//         />
//       </div>
//     );
//   },
// );
//
// ProgressBar.displayName = "ProgressBar";
//
// export default ProgressBar;
