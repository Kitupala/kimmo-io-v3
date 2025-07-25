import React from "react";
import type { CardRefs } from "../types";

export const createCardRefs = (length: number): CardRefs[] => {
  return Array(length)
    .fill(0)
    .map(() => ({
      marqueeRef: React.createRef<HTMLDivElement>(),
      cardImgWrapperRef: React.createRef<HTMLDivElement>(),
      cardImgRef: React.createRef<HTMLImageElement>(),
      projectImgRef: React.createRef<HTMLDivElement>(),
      eyebrowRef: React.createRef<HTMLDivElement>(),
      descriptionRef: React.createRef<HTMLDivElement>(),
      techIconsRef: React.createRef<HTMLDivElement>(),
      cardActionsRef: React.createRef<HTMLDivElement>(),
      detailsContainerRef: React.createRef<HTMLDivElement>(),
    }));
};

export const getCardElements = (cardRefs: CardRefs) => {
  const refs = cardRefs;
  if (!refs) return null;

  return {
    cardMarquee: refs.marqueeRef.current,
    cardImgWrapper: refs.cardImgWrapperRef.current,
    cardImg: refs.cardImgRef.current,
    projectImg: refs.projectImgRef.current,
    eyebrow: refs.eyebrowRef.current,
    description: refs.descriptionRef.current,
    techIcons: refs.techIconsRef.current,
    cardActions: refs.cardActionsRef.current,
    detailsContainer: refs.detailsContainerRef.current,
  };
};
