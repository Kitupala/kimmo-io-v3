"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

import Link from "next/link";
import Logo from "@/app/components/Logo";
import NavMobile from "@/app/components/NavMobile";
import NavDesktop from "@/app/components/NavDesktop";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

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

  return (
    <div
      ref={containerRef}
      className="xs:top-3 fixed inset-x-0 top-2 z-40 backdrop-blur-md"
    >
      <div className="xs:px-4 mx-auto w-full max-w-[1000px] px-2">
        <header className="bg-background/30 border-grid-line xs:px-8 xs:py-4 relative z-30 overflow-x-hidden rounded-xl border px-4 py-3">
          <div className="mx-auto flex items-center justify-between">
            <Link href="/" className="relative z-50 py-4">
              <Logo fill="#d0d6e0" />
            </Link>

            <NavMobile />
            <NavDesktop />
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
