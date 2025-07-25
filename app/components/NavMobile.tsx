"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useGSAP } from "@gsap/react";
import { useScrollLock } from "@/app/hooks/useScrollLock";

import AnimatedText from "@/app/components/AnimatedText";
import { Squash as Hamburger } from "hamburger-react";
import { routes } from "../routes";
import Link from "next/link";

const NavMobile = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animContainerRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useClickAway(containerRef, () => setIsOpen(false));
  useScrollLock(isOpen);

  const headerHeight = "22px";

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  useEffect(() => {
    // Set dynamic viewport height custom property
    const setDynamicVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--dvh", `${vh}px`);
      document.documentElement.style.setProperty(
        "--header-height",
        headerHeight,
      );
    };

    setDynamicVH();
    window.addEventListener("resize", setDynamicVH);
    return () => window.removeEventListener("resize", setDynamicVH);
  }, []);

  // Animate in when shouldRender becomes true
  useGSAP(
    () => {
      if (isOpen && shouldRender) {
        const items = navItemsRef.current.filter(Boolean);

        // Container animation
        if (animContainerRef.current) {
          gsap.set(animContainerRef.current, {
            opacity: 0.5,
            height: headerHeight,
            overflow: "hidden",
          });

          gsap.to(animContainerRef.current, {
            opacity: 1,
            height: "calc(100 * var(--dvh) - var(--header-height))",
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(animContainerRef.current, { overflow: "auto" });
            },
          });
        }

        // List item animation
        gsap.set(items, { scale: 0.8, opacity: 0, y: 20 });
        gsap.to(items, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(0.8, 0.4)",
          stagger: 0.25,
        });
      }
    },
    { dependencies: [isOpen, shouldRender] },
  );

  // Animate out when closing
  useGSAP(
    () => {
      if (!isOpen && shouldRender) {
        const items = navItemsRef.current.filter(Boolean);

        // Animate list items out
        gsap.to(items, {
          scale: 0.9,
          opacity: 0,
          y: 10,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.inOut",
        });

        // Animate container out
        if (animContainerRef.current) {
          gsap.set(animContainerRef.current, { overflow: "hidden" });

          gsap.to(animContainerRef.current, {
            opacity: 0,
            height: headerHeight,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => setShouldRender(false),
          });
        } else {
          setShouldRender(false);
        }
      }
    },
    { dependencies: [isOpen, shouldRender] },
  );

  return (
    <div ref={containerRef} className="sm:hidden">
      <div className="relative z-50">
        <Hamburger toggled={isOpen} size={20} toggle={setIsOpen} />
      </div>

      {shouldRender && (
        <div
          ref={animContainerRef}
          className="border-grid-line bg-background fixed left-2 right-2 top-0 z-40 rounded-lg border sm:left-4 sm:right-4 lg:hidden"
        >
          <div className="mt-28 p-6">
            <ul className="flex flex-col space-y-4">
              {routes.map((route, idx) => (
                <li
                  key={route.title}
                  ref={(el: HTMLLIElement | null): void => {
                    navItemsRef.current[idx] = el;
                  }}
                  className="from-grid-line via-grid-line-bright to-grid-line w-full rounded-xl bg-gradient-to-tr p-px"
                >
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={route.href}
                    className="bg-background flex w-full items-center justify-center rounded-xl p-4"
                  >
                    <AnimatedText
                      splitType="chars"
                      delay={0.15 * idx}
                      duration={0.2}
                      className="text-text-primary text-base"
                      as="span"
                    >
                      {route.title}
                    </AnimatedText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMobile;
