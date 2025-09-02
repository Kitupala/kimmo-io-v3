import React from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import type { CardRefs } from "../types";
import { animateContentIn, animateContentOut } from "./animationUtils";
import { getCardElements } from "./cardUtils";

interface CreateScrollTriggersProps {
  cards: HTMLElement[];
  cardRefs: CardRefs[];
  scrollHintRef: React.RefObject<HTMLDivElement | null>;
  progressBarRef: React.RefObject<HTMLDivElement | null>;
  revealedCardRefs: React.RefObject<boolean[]>;
  nextSection: Element | null | undefined;
  setIsLastCardVisible: (visible: boolean) => void;
  setIsInNextSection: (inNext: boolean) => void;
}

export const createScrollTriggers = ({
  cards,
  cardRefs,
  scrollHintRef,
  progressBarRef,
  revealedCardRefs,
  nextSection,
  setIsLastCardVisible,
  setIsInNextSection,
}: CreateScrollTriggersProps) => {
  // Create pin wrappers for each card
  cards.forEach((card, idx) => {
    const isLastCard = idx === cards.length - 1;
    const select = gsap.utils.selector(card);
    const titleChars = select(".char span");
    const progressBar = progressBarRef.current;

    // For the last card, create a pin with a short duration
    if (isLastCard) {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: "+=20%",
        pin: true,
        pinSpacing: false,
        id: `pin-card-${idx}`,
        onEnter: () => setIsLastCardVisible(true),
        onLeaveBack: () => setIsLastCardVisible(false),
      });

      // Set up ScrollTrigger for next section
      if (nextSection) {
        ScrollTrigger.create({
          trigger: nextSection,
          start: "top 80%",
          onEnter: () => setIsInNextSection(true),
          onLeaveBack: () => setIsInNextSection(false),
        });
      }
    } else {
      // For all other cards, pin normally
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: idx === 0 ? "bottom+=80% top" : "bottom+=30% top",
        pin: true,
        pinSpacing: false,
        id: `pin-card-${idx}`,
      });
    }

    // First card special image scaling animation
    if (idx === 0) {
      const scrollHint = scrollHintRef.current;
      const firstCardElements = getCardElements(cardRefs[0]);

      if (!firstCardElements) return;

      const {
        cardMarquee,
        cardImgWrapper,
        cardImg,
        eyebrow,
        description,
        techIcons,
        cardActions,
        projectImg,
        detailsContainer,
      } = firstCardElements;

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: "+=300vh",
        onUpdate: (self) => {
          const progress = self.progress;
          const imgScale = 0.5 + progress * 0.5;
          const borderRadius = 100 - progress * 75;
          const innerImgScale = 1.5 - progress * 0.5;

          if (cardImgWrapper) {
            gsap.set(cardImgWrapper, {
              scale: imgScale,
              borderRadius: borderRadius + "px",
            });
          }

          if (cardImg) {
            gsap.set(cardImg, {
              scale: innerImgScale,
            });
          }

          // ScrollHint animation
          if (scrollHint && progress <= 0.5) {
            const hintProgress = progress / 0.5;
            const hintScale = 1 + hintProgress * 0.5;
            const hintOpacity = 1 - hintProgress;

            gsap.set(scrollHint, {
              scale: hintScale,
              opacity: hintOpacity,
            });
          } else if (scrollHint && progress > 0.5) {
            gsap.set(scrollHint, {
              opacity: 0,
            });
          }

          // Marquee animation
          if (cardMarquee) {
            if (imgScale >= 0.5 && imgScale <= 0.75) {
              const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
              gsap.set(cardMarquee, { opacity: 1 - fadeProgress });
            } else if (imgScale < 0.5) {
              gsap.set(cardMarquee, { opacity: 1 });
            } else if (imgScale > 0.75) {
              gsap.set(cardMarquee, { opacity: 0 });
            }
          }

          // Content animations with proper state tracking
          if (progress >= 1) {
            if (!revealedCardRefs.current[idx]) {
              revealedCardRefs.current[idx] = true;
              animateContentIn({
                titleChars,
                eyebrow,
                description,
                techIcons,
                progressBar,
                cardActions,
                projectImage: projectImg,
                detailsContainer,
              });
            }
          } else {
            if (revealedCardRefs.current[idx]) {
              revealedCardRefs.current[idx] = false;
              animateContentOut({
                titleChars,
                eyebrow,
                description,
                techIcons,
                progressBar,
                cardActions,
                projectImage: projectImg,
                detailsContainer,
              });
            }
          }
        },
      });
    }

    // For cards after the first one, handle scaling during transitions
    if (idx > 0) {
      const select = gsap.utils.selector(card);
      const cardImg = select(".card-img img")[0];
      const imgContainer = select(".card-img")[0];

      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardImg, {
            scale: 2 - progress,
          });
          gsap.set(imgContainer, {
            borderRadius: 100 - progress * 75 + "px",
          });
        },
      });
    }
  });

  // Handle card wrapper transitions between cards
  cards.forEach((card, idx) => {
    if (idx < cards.length - 1) {
      const select = gsap.utils.selector(card);
      const cardWrapper = select(".card-wrapper");

      ScrollTrigger.create({
        trigger: cards[idx + 1],
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardWrapper, {
            scale: 1 - progress * 0.1,
            opacity: 1 - progress * 0.5,
          });
        },
        onLeave: () => {
          gsap.set(cardWrapper, {
            opacity: 0,
          });
        },
      });
    }
  });

  // Handle card content reveal animations for cards after the first one
  cards.forEach((card, idx) => {
    if (idx === 0) return;

    const select = gsap.utils.selector(card);
    const eyebrow = select(".card-eyebrow")[0];
    const titleChars = select(".char span");
    const description = select(".card-description")[0] as HTMLDivElement;
    const techIconsContainer = select(".tech-icons-wrapper")[0];
    const cardActions = select(".card-actions")[0];
    const projectImage = select(".project-image")[0];
    const detailsContainer = select(".details-container")[0];

    if (eyebrow) {
      gsap.set(eyebrow, { x: "10px", opacity: 0 });
    }

    if (description) {
      gsap.set(description, { x: "40px", opacity: 0 });
    }

    // Create a separate animation for the project image
    if (projectImage) {
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom+=15%",
        end: "top top",

        onUpdate: (self) => {
          const progress = self.progress;

          const startRadius = 60;
          const endRadius = 12;
          const currentRadius =
            startRadius + (endRadius - startRadius) * progress;
          const opacityProgress = gsap.parseEase("power2.in")(progress);

          gsap.set(projectImage, {
            borderRadius: `${currentRadius}px`,
            opacity: opacityProgress,
          });
        },
      });
    }

    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      onEnter: () => {
        if (!revealedCardRefs.current[idx]) {
          revealedCardRefs.current[idx] = true;
          animateContentIn({
            titleChars,
            eyebrow,
            description,
            techIcons: techIconsContainer,
            progressBar: null,
            cardActions,
            projectImage: null,
            detailsContainer,
          });
        }
      },
      onLeaveBack: () => {
        if (revealedCardRefs.current[idx]) {
          revealedCardRefs.current[idx] = false;
          animateContentOut({
            titleChars,
            eyebrow,
            description,
            techIcons: techIconsContainer,
            progressBar: null,
            cardActions,
            projectImage,
            detailsContainer,
          });
        }
      },
    });
  });
};
