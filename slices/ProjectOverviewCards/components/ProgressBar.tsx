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
        "z-50 h-px w-46 overflow-hidden rounded-full bg-grid-line-bright transition-opacity transition-none duration-500 ease-in-out",
        isLastCardVisible && !isInNextSection
          ? "fixed right-18 bottom-16"
          : isInNextSection
            ? "absolute right-18 -bottom-23.5"
            : "fixed right-18 bottom-16",
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
