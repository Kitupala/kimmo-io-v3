"use client";

import { routes } from "../routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

const NavDesktop = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:block">
      <ul className="flex space-x-12">
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
                  "text-text-primary hover:text-text-secondary flex items-center gap-2 text-base transition-colors",
                  isActive && "pointer-events-none opacity-70",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavDesktop;
