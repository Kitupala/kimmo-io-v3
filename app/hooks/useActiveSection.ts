import { useState, useEffect } from "react";

interface Route {
  href: string;
  title: string;
  offset?: number;
}

interface UseActiveSectionOptions {
  sectionId?: string;
  sectionThreshold?: number;
  rootMargin?: string;
  thresholds?: number[];
}

export const useActiveSection = (
  routes: Route[],
  options: UseActiveSectionOptions = {},
) => {
  const {
    sectionId = "hero",
    sectionThreshold = -50,
    rootMargin = "-20% 0px -40% 0px",
    thresholds = [0, 0.25, 0.5, 0.75, 1],
  } = options;

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const hashRoutes = routes
      .filter((route) => route.href.startsWith("#"))
      .map((route) => ({
        id: route.href.slice(1),
        href: route.href,
        element: document.getElementById(route.href.slice(1)),
      }))
      .filter((section) => section.element !== null);

    if (hashRoutes.length === 0) return;

    const visibleSections = new Map<string, number>();

    const findClosestSection = () => {
      const element = document.getElementById(sectionId);
      const isElementVisible =
        element && element.getBoundingClientRect().top >= sectionThreshold;

      if (isElementVisible) {
        setActiveSection("");
        return;
      }

      if (visibleSections.size > 0) {
        const sorted = Array.from(visibleSections.entries()).sort((a, b) => {
          const elA = document.querySelector(a[0]);
          const elB = document.querySelector(b[0]);
          if (!elA || !elB) return 0;

          const rectA = elA.getBoundingClientRect();
          const rectB = elB.getBoundingClientRect();
          return Math.abs(rectA.top) - Math.abs(rectB.top);
        });

        setActiveSection(sorted[0][0]);
      } else {
        setActiveSection("");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}`;

          if (entry.isIntersecting) {
            visibleSections.set(href, entry.intersectionRatio);
          } else {
            visibleSections.delete(href);
          }
        });

        findClosestSection();
      },
      { threshold: thresholds, rootMargin },
    );

    hashRoutes.forEach((section) => {
      if (section.element) observer.observe(section.element);
    });

    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [routes, sectionId, sectionThreshold, rootMargin, thresholds]);

  return activeSection;
};
