"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Squash as Hamburger } from "hamburger-react";

import { gsap, useGSAP } from "@/app/lib/gsap";
import { cn } from "@/app/lib/utils";
import { useLenis } from "@/app/hooks/useLenis";
import { useScrollLock } from "@/app/hooks/useScrollLock";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { routes } from "@/app/routes";
import { SCROLL_CONFIG } from "@/app/constants";

const NavMobile = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();
  const activeSection = useActiveSection(routes);

  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const headerHeight = "16px";

  useScrollLock(isOpen, lenis);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const setDynamicVH = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--dvh", `${vh}px`);
        document.documentElement.style.setProperty(
          "--header-height",
          headerHeight,
        );
      }, 100);
    };

    setDynamicVH();
    window.addEventListener("resize", setDynamicVH);
    return () => window.removeEventListener("resize", setDynamicVH);
  }, []);

  useGSAP(
    () => {
      if (!menuRef.current || !shouldRender) return;

      const menu = menuRef.current;
      const items = navItemsRef.current.filter(Boolean);

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Create timeline
      const tl = gsap.timeline({
        onComplete: () => {
          if (!isOpen) {
            setShouldRender(false);
          } else if (menu) {
            gsap.set(menu, { overflow: "auto" });
          }
        },
      });

      if (isOpen) {
        // Opening animation
        tl.set(menu, {
          autoAlpha: 0,
          height: headerHeight,
          overflow: "hidden",
          scale: 0.98,
        })
          .set(items, { scale: 0.8, autoAlpha: 0, y: 20 })
          .to(
            menu,
            {
              autoAlpha: 1,
              height: "calc(100vh - var(--header-height))",
              scale: 1,
              duration: 0.4,
              ease: "power3.out",
            },
            0,
          )
          .to(
            items,
            {
              scale: 1,
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "elastic.out(0.8, 0.4)",
              stagger: 0.15,
            },
            0.1,
          );
      } else {
        // Closing animation
        tl.set(menu, { overflow: "hidden" })
          .to(
            items,
            {
              scale: 0.9,
              autoAlpha: 0,
              y: 10,
              duration: 0.3,
              stagger: 0.05,
              ease: "power3.inOut",
            },
            0,
          )
          .to(
            menu,
            {
              autoAlpha: 0,
              height: headerHeight,
              duration: 0.5,
              ease: "power3.inOut",
            },
            0.1,
          );
      }

      timelineRef.current = tl;
    },
    { dependencies: [isOpen, shouldRender], scope: containerRef },
  );

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    offset?: number,
  ) => {
    e.preventDefault();

    if (href && lenis) {
      setIsOpen(false);

      setTimeout(() => {
        lenis.scrollTo(href, {
          duration: SCROLL_CONFIG.duration,
          offset: offset ?? SCROLL_CONFIG.defaultOffset,
        });
      }, 200);
    }
  };

  return (
    <div ref={containerRef} className="nav-mobile sm:hidden">
      <div className="relative z-50">
        <Hamburger
          toggled={isOpen}
          size={20}
          toggle={setIsOpen}
          aria-expanded={isOpen}
        />
      </div>

      {shouldRender && (
        <div
          ref={menuRef}
          className="fixed top-0 right-2 left-2 z-40 rounded-lg border border-grid-line bg-background sm:right-4 sm:left-4 lg:hidden"
          aria-hidden={!isOpen}
        >
          <div className="mt-28 p-6">
            <ul className="flex flex-col space-y-4">
              {routes.map((route, idx) => {
                const isActive = activeSection === route.href;
                return (
                  <li
                    key={route.title}
                    ref={(el: HTMLLIElement | null): void => {
                      navItemsRef.current[idx] = el;
                    }}
                    className="w-full rounded-xl bg-gradient-to-tr from-grid-line via-grid-line-bright to-grid-line p-px"
                  >
                    <Link
                      onClick={(e) => handleClick(e, route.href, route.offset)}
                      href={route.href}
                      className={cn(
                        "flex w-full items-center justify-center rounded-xl bg-background p-4",
                        isActive && "font-medium text-text-primary",
                        !isActive && "text-text-tertiary",
                      )}
                    >
                      {route.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMobile;
