"use client";

import React, { useRef } from "react";
import Link from "next/link";

import { gsap, useGSAP } from "@/app/lib/gsap";
import { cn } from "@/app/lib/utils";
import { useLenis } from "@/app/hooks/useLenis";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { routes } from "@/app/routes";
import { SCROLL_CONFIG } from "@/app/constants";

const NavDesktop = () => {
  const navRef = useRef<HTMLUListElement>(null);
  const lenis = useLenis();
  const activeSection = useActiveSection(routes);

  useGSAP(
    () => {
      if (!navRef.current) return;
      const items = navRef.current.querySelectorAll(".nav-link-wrap");

      items.forEach((item) => {
        const [first, second] = item.querySelectorAll(".nav-link-text");

        gsap.set(second, { yPercent: 100 });
        gsap.set(first, { yPercent: 0 });

        item.addEventListener("mouseenter", () => {
          gsap
            .timeline({ defaults: { ease: "power3.inOut", duration: 0.4 } })
            .to(first, { yPercent: -100 }, 0)
            .to(second, { yPercent: 0 }, 0);
        });

        item.addEventListener("mouseleave", () => {
          gsap
            .timeline({ defaults: { ease: "power3.inOut", duration: 0.4 } })
            .to(first, { yPercent: 0 }, 0)
            .to(second, { yPercent: 100 }, 0);
        });
      });
    },
    { scope: navRef },
  );

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    offset?: number,
  ) => {
    e.preventDefault();
    if (href && lenis) {
      lenis.scrollTo(href, {
        duration: SCROLL_CONFIG.duration,
        offset: offset ?? SCROLL_CONFIG.defaultOffset,
      });
    }
  };

  return (
    <nav className="hidden sm:block">
      <ul ref={navRef} className="flex space-x-12">
        {routes.map((route) => {
          const { href, title, offset } = route;
          const isActive = activeSection === href;

          return (
            <li key={title} className="desktop-nav-item">
              <Link
                href={href}
                onClick={(e) => handleClick(e, href, offset)}
                className={cn(
                  "nav-link",
                  isActive && "opacity-100",
                  !isActive && "opacity-60 hover:opacity-100",
                )}
                aria-current={isActive ? "page" : undefined}
                data-cursor="-inverse"
              >
                <span
                  className={cn(
                    "nav-link-wrap",
                    isActive && "after:scale-x-100",
                  )}
                >
                  <span className="nav-link-text relative">{title}</span>
                  <span className="nav-link-text absolute top-0 left-0 block">
                    {title}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavDesktop;
