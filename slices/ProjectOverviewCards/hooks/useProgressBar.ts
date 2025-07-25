import { useRef, useEffect, RefObject } from "react";
import type Lenis from "lenis";

interface UseProgressBarProps {
  cardsSectionRef: RefObject<HTMLDivElement | null>;
  progressBarInnerRef: RefObject<HTMLDivElement | null>;
  lenis: Lenis | null;
}

export const useProgressBar = ({
  cardsSectionRef,
  progressBarInnerRef,
  lenis,
}: UseProgressBarProps) => {
  const cardProgressRef = useRef(0);

  useEffect(() => {
    if (!lenis || !cardsSectionRef.current) return;

    const cardsSection = cardsSectionRef.current;
    const nextSection = cardsSection.nextElementSibling;

    if (!nextSection) return;

    // Calculate the total scroll distance
    const startPosition =
      cardsSection.getBoundingClientRect().top + window.scrollY;
    const endPosition =
      nextSection.getBoundingClientRect().top +
      window.scrollY -
      window.innerHeight;
    const totalDistance = endPosition - startPosition;

    const updateProgressBar = () => {
      const currentScroll = lenis.scroll;
      let progress: number;

      if (currentScroll <= startPosition) {
        progress = 0;
      } else if (currentScroll >= endPosition) {
        progress = 1;
      } else {
        progress = (currentScroll - startPosition) / totalDistance;
      }

      cardProgressRef.current = Math.max(0, Math.min(1, progress));

      const progressElement = progressBarInnerRef.current;
      if (progressElement) {
        progressElement.style.width = `${cardProgressRef.current * 100}%`;
      }
    };

    lenis.on("scroll", updateProgressBar);

    updateProgressBar();

    return () => {
      lenis.off("scroll", updateProgressBar);
    };
  }, [lenis, cardsSectionRef, progressBarInnerRef]);

  return { cardProgressRef };
};
