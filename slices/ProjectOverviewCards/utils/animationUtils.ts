import gsap from "gsap";
import type { CardContent } from "../types";

export const animateContentIn = (elements: CardContent) => {
  const {
    eyebrow,
    titleChars,
    description,
    progressBar,
    techIcons,
    cardActions,
    projectImage,
    detailsContainer,
  } = elements;

  const tl = gsap.timeline();

  if (eyebrow) {
    tl.to(
      eyebrow,
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power4.out",
      },
      0,
    );
  }

  if (titleChars) {
    tl.to(
      titleChars,
      {
        x: "0%",
        duration: 0.75,
        ease: "power4.out",
      },
      0.2,
    );
  }

  if (description) {
    tl.to(
      description,
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power4.out",
      },
      0.5,
    );
  }

  if (techIcons) {
    tl.to(
      techIcons,
      {
        x: 0,
        opacity: 1,
        duration: 0.1,
        overwrite: true,
      },
      0.6,
    );

    const iconElements = techIcons.querySelectorAll(".tech-icon-container");
    if (iconElements.length) {
      tl.set(
        iconElements,
        {
          y: 30,
          opacity: 0,
          scale: 0.8,
        },
        0.4,
      ).to(
        iconElements,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
        0.6,
      );
    }
  }

  if (cardActions) {
    tl.fromTo(
      cardActions,
      {
        x: "40px",
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power4.out",
      },
      0.6,
    );

    const links = cardActions.querySelectorAll(".project-link");
    if (links.length) {
      tl.set(
        links,
        {
          y: 15,
          opacity: 0,
          scale: 0.9,
        },
        0.3,
      ).to(
        links,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        0.6,
      );
    }
  }

  if (projectImage) {
    gsap.killTweensOf(projectImage);
    tl.fromTo(
      projectImage,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      0.2,
    );
  }

  if (detailsContainer) {
    gsap.killTweensOf(detailsContainer);
    tl.fromTo(
      detailsContainer,
      {
        scale: 0.9,
        opacity: 0,
        y: 20,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
      },
      0.1,
    );
  }

  if (progressBar) {
    tl.to(
      progressBar,
      {
        opacity: 1,
        duration: 0.75,
      },
      0,
    );
  }

  return tl;
};

export const animateContentOut = (elements: CardContent) => {
  const {
    eyebrow,
    titleChars,
    description,
    progressBar,
    techIcons,
    cardActions,
    projectImage,
    detailsContainer,
  } = elements;

  const tl = gsap.timeline();

  // Animate out in reverse order
  if (titleChars) {
    tl.to(
      titleChars,
      {
        x: "100%",
        duration: 0.75,
        ease: "power4.out",
      },
      0,
    );
  }

  if (eyebrow) {
    tl.to(
      eyebrow,
      {
        x: "10px",
        opacity: 0,
        duration: 0.3,
        ease: "power4.out",
      },
      0,
    );
  }

  if (description) {
    tl.to(
      description,
      {
        x: "40px",
        opacity: 0,
        duration: 0.3,
        ease: "power4.out",
      },
      0.1,
    );
  }

  if (techIcons) {
    const iconElements = techIcons.querySelectorAll(".tech-icon-container");
    if (iconElements.length) {
      gsap.killTweensOf(iconElements);
    }

    tl.to(
      techIcons,
      {
        x: "40px",
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      0.15,
    );
  }

  if (cardActions) {
    const links = cardActions.querySelectorAll(".project-link");
    if (links.length) {
      gsap.killTweensOf(links);
    }

    tl.to(
      cardActions,
      {
        x: "40px",
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      0.2,
    );
  }

  if (projectImage) {
    gsap.killTweensOf(projectImage);
    tl.to(
      projectImage,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      0,
    );
  }

  if (detailsContainer) {
    gsap.killTweensOf(detailsContainer);
    tl.to(
      detailsContainer,
      {
        scale: 0.95,
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
      },
      0,
    );
  }

  if (progressBar) {
    tl.to(
      progressBar,
      {
        opacity: 0,
        duration: 0.3,
      },
      0,
    );
  }

  return tl;
};
