"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Logo from "@/app/components/Logo";
import NavMobile from "@/app/components/NavMobile";
import NavDesktop from "@/app/components/NavDesktop";

import { gsap, useGSAP } from "@/app/lib/gsap";
import { useLenis } from "@/app/hooks/useLenis";
import { SCROLL_CONFIG } from "@/app/constants";

const Header = () => {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const lastScrollYRef = useRef<number>(0);
  const currentScrollYRef = useRef<number>(0);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);

  // Listen to Lenis scroll events
  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (e: { scroll: number }) => {
      const scrollY = e.scroll;
      currentScrollYRef.current = scrollY;
      lastActivityRef.current = Date.now();

      if (scrollY === 0 || isMouseOver) {
        setIsNavVisible(true);
      } else if (scrollY > lastScrollYRef.current) {
        setIsNavVisible(false);
      } else if (scrollY < lastScrollYRef.current) {
        setIsNavVisible(true);
      }

      lastScrollYRef.current = scrollY;
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, isMouseOver]);

  // Check for inactivity
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now();
      const inactiveTime = now - lastActivityRef.current;

      if (
        inactiveTime >= 1500 &&
        currentScrollYRef.current > 50 &&
        !isMouseOver
      ) {
        setIsNavVisible((prev) => (prev ? false : prev));
      }
    };

    const intervalId = setInterval(checkInactivity, 500);

    return () => clearInterval(intervalId);
  }, [isMouseOver]);

  // Initial page load animation
  useEffect(() => {
    if (containerRef.current && !isInitialized && window.scrollY <= 10) {
      gsap.set(containerRef.current, {
        y: -150,
        opacity: 0,
        scale: 0.95,
      });

      gsap.to(containerRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(0.4, 0.2)",
        delay: 3.2,
        onComplete: () => setIsInitialized(true),
      });
    } else if (containerRef.current && !isInitialized) {
      gsap.set(containerRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Scroll-based visibility animation
  useGSAP(
    () => {
      if (isInitialized) {
        gsap.to(containerRef.current, {
          y: isNavVisible ? 0 : -100,
          opacity: isNavVisible ? 1 : 0,
          duration: 0.3,
        });
      }
    },
    { dependencies: [isNavVisible, isInitialized], scope: containerRef },
  );

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    setIsNavVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo("#hero", { duration: SCROLL_CONFIG.duration, offset: 0 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 top-2 z-40 mx-auto max-w-[1000px] px-2 backdrop-blur-sm xs:top-3 lg:px-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <header className="relative z-30 rounded-xl border border-grid-line bg-background/30 px-4 py-3 xs:px-8 xs:py-4">
        <div className="mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="relative z-50 py-4"
            data-cursor="-inverse"
            onClick={handleLogoClick}
          >
            <Logo className="h-auto w-[60px] sm:w-[75px]" fill="#cfd5de" />
          </Link>

          <NavMobile />
          <NavDesktop />
        </div>
      </header>
    </div>
  );
};

export default Header;
