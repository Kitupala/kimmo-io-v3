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
        "z-50 h-px w-32 overflow-hidden rounded-full bg-grid-line-bright transition-opacity transition-none duration-500 ease-in-out sm:w-46",
        isLastCardVisible && !isInNextSection
          ? "fixed right-10 bottom-16 sm:right-18"
          : isInNextSection
            ? "absolute right-10 -bottom-23.5 sm:right-18"
            : "fixed right-10 bottom-16 sm:right-18",
      )}
    >
      <div
        ref={innerRef}
        className="h-full bg-text-accent"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;
