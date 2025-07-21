import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CardRefs } from "../types";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export const setupInitialStyles = ({
  cardRefs,
  progressBar,
  cards,
}: {
  cardRefs: CardRefs[];
  progressBar: HTMLElement | null;
  cards: HTMLElement[];
}) => {
  const firstCardRefs = cardRefs[0];

  if (firstCardRefs.cardImgWrapperRef.current) {
    gsap.set(firstCardRefs.cardImgWrapperRef.current, {
      scale: 0.5,
      borderRadius: "100px",
    });
  }

  if (firstCardRefs.cardImgRef.current) {
    gsap.set(firstCardRefs.cardImgRef.current, {
      scale: 1.5,
      ease: "power3.inOut",
    });
  }

  if (progressBar) {
    gsap.set(progressBar, { opacity: 0 });
  }

  // Setup each card's elements
  cards.forEach((card) => {
    const select = gsap.utils.selector(card);
    const projectImage = select(".project-image")[0];
    const detailsContainer = select(".details-container")[0];
    const cardActions = select(".card-actions")[0];

    if (projectImage) {
      gsap.set(projectImage, { opacity: 0 });
    }

    if (detailsContainer) {
      gsap.set(detailsContainer, {
        opacity: 0,
        scale: 0.9,
        y: 20,
      });
    }

    if (cardActions) {
      gsap.set(cardActions, { x: "40px", opacity: 0 });
      const links = cardActions.querySelectorAll(".project-link");
      gsap.set(links, {
        y: 15,
        opacity: 0,
        scale: 0.9,
      });
    }
  });
};

export const setupTextSplitting = () => {
  const titles = gsap.utils.toArray<HTMLElement>(".card-title h3");

  // Split each title into characters
  titles.forEach((title) => {
    if (!title?.textContent) return;

    const split = new SplitText(title, {
      type: "chars",
      charsClass: "char",
      tag: "span",
    });

    split.chars.forEach((char) => {
      char.innerHTML = `<span>${char.textContent}</span>`;
      gsap.set(char.querySelector("span"), {
        x: "100%",
      });
    });
  });
};
