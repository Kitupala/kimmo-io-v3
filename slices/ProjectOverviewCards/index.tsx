"use client";

import React, { FC, useMemo, useRef, useState } from "react";
import { useLenis } from "@/app/hooks/useLenis";
import { createCardRefs } from "./utils/cardUtils";
import { useProjectCardsAnimation } from "./hooks/useProjectCardsAnimation";
import { useProgressBar } from "./hooks/useProgressBar";

import IntroSection from "./components/IntroSection";
import ProjectCard from "./components/ProjectCard";
import ProgressBar from "./components/ProgressBar";
import OutroSection from "./components/OutroSection";
import type { ProjectOverviewCardProps } from "./types";

const ProjectOverviewCards: FC<ProjectOverviewCardProps> = ({ slice }) => {
  const [isLastCardVisible, setIsLastCardVisible] = useState(false);
  const [isInNextSection, setIsInNextSection] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsSectionRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarInnerRef = useRef<HTMLDivElement>(null);

  // Memoized card refs
  const cardRefs = useMemo(
    () => createCardRefs(slice.primary.project.length),
    [slice.primary.project.length],
  );

  const lenis = useLenis({
    duration: 3,
    wheelMultiplier: 0.65,
  });

  const { cardProgressRef } = useProgressBar({
    cardsSectionRef,
    progressBarInnerRef,
    lenis,
  });

  useProjectCardsAnimation({
    containerRef,
    cardsSectionRef,
    scrollHintRef,
    progressBarRef,
    cardRefs,
    projects: slice.primary.project,
    lenis,
    setIsLastCardVisible,
    setIsInNextSection,
  });

  return (
    <div ref={containerRef} className="relative" id="work">
      <IntroSection
        heading={slice.primary.heading}
        description={slice.primary.description}
      />

      <section
        ref={cardsSectionRef}
        className="cards bg-[linear-gradient(180deg,rgba(97,106,115,0.08)_0%,rgba(97,106,115,0.1)_75%,transparent_100%)]"
      >
        {slice.primary.project.map((card, index) => (
          <ProjectCard
            key={card.project_title || index}
            card={card}
            index={index}
            isFirst={index === 0}
            scrollHintRef={index === 0 ? scrollHintRef : null}
            refs={cardRefs[index]}
          />
        ))}

        <ProgressBar
          ref={progressBarRef}
          innerRef={progressBarInnerRef}
          progress={cardProgressRef.current}
          isLastCardVisible={isLastCardVisible}
          isInNextSection={isInNextSection}
        />
      </section>

      <OutroSection />
    </div>
  );
};

export default ProjectOverviewCards;
