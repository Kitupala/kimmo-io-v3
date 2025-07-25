import gsap from "gsap";

export const setupMarqueeAnimation = (marqueeRef: HTMLDivElement | null) => {
  if (!marqueeRef) return;

  const marquee = marqueeRef.querySelector(".marquee") as HTMLElement;
  if (!marquee) return;

  const distance = marquee.scrollWidth / 2;

  gsap.set(marquee, { x: 0 });

  gsap.to(marquee, {
    x: `-=${distance}`,
    duration: 400,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % distance),
    },
  });
};
