"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routes } from "../routes";
import { cn } from "@/app/lib/utils";
import { gsap, useGSAP } from "@/app/lib/gsap";

const NavDesktop = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!navRef.current) return;

      const items = navRef.current.querySelectorAll(".nav-link-wrap");

      items.forEach((item) => {
        const [first, second] = item.querySelectorAll(".nav-link-text");

        // initial state
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

  return (
    <nav className="hidden sm:block">
      <ul ref={navRef} className="flex space-x-12">
        {routes.map((route) => {
          const { href, title } = route;
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <li key={title} className="desktop-nav-item">
              <Link
                href={href}
                onClick={(e) => isActive && e.preventDefault()}
                className={cn(
                  "flex items-center gap-2 text-base text-text-primary",
                  isActive && "pointer-events-none opacity-70",
                )}
                aria-current={isActive ? "page" : undefined}
                data-cursor="-inverse"
              >
                <span className="nav-link-wrap relative block overflow-hidden">
                  <span className="nav-link-text relative block">{title}</span>
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
