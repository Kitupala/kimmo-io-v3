import { RefObject, useRef } from "react";

import { gsap, useGSAP, ScrollTrigger } from "@/app/lib/gsap";
import { setupInitialStyles, setupTextSplitting } from "../utils/gsapSetup";
import { createScrollTriggers } from "../utils/scrollTriggerUtils";
import { setupMarqueeAnimation } from "../utils/marqueeUtils";
import type { CardRefs } from "../types";
import { GroupField } from "@prismicio/client";
import {
  ProjectOverviewCardSliceDefaultPrimaryProjectItem,
  Simplify,
} from "@/prismicio-types";
import type Lenis from "lenis";

interface UseProjectCardsAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  cardsSectionRef: RefObject<HTMLDivElement | null>;
  scrollHintRef: RefObject<HTMLDivElement | null>;
  progressBarRef: RefObject<HTMLDivElement | null>;
  cardRefs: CardRefs[];
  projects: GroupField<
    Simplify<ProjectOverviewCardSliceDefaultPrimaryProjectItem>
  >;
  lenis: Lenis | null;
  setIsLastCardVisible: (visible: boolean) => void;
  setIsInNextSection: (inNext: boolean) => void;
}

export const useProjectCardsAnimation = ({
  containerRef,
  cardsSectionRef,
  scrollHintRef,
  progressBarRef,
  cardRefs,
  projects,
  lenis,
  setIsLastCardVisible,
  setIsInNextSection,
}: UseProjectCardsAnimationProps) => {
  const revealedCardRefs = useRef<boolean[]>([]);

  useGSAP(
    () => {
      const cardsSection = cardsSectionRef.current;
      const cards = gsap.utils.toArray<HTMLElement>(".card");
      const progressBar = progressBarRef.current;
      const nextSection = cardsSection?.nextElementSibling;

      if (!cardsSection || !cards.length) return;

      // Initialize state
      revealedCardRefs.current = Array(cards.length).fill(false);

      ScrollTrigger.getAll().forEach((st) => st.kill());

      setupInitialStyles({
        cardRefs,
        progressBar,
        cards,
      });

      setupTextSplitting();

      setupMarqueeAnimation(cardRefs[0].marqueeRef.current);

      // Create ScrollTriggers for each card
      createScrollTriggers({
        cards,
        cardRefs,
        scrollHintRef,
        revealedCardRefs,
        progressBarRef,
        nextSection,
        setIsLastCardVisible,
        setIsInNextSection,
      });

      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 300);
    },
    { scope: containerRef, dependencies: [lenis, projects.length] },
  );
};
