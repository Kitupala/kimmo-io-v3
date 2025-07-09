"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

import Link from "next/link";
import Logo from "@/app/components/Logo";
import NavMobile from "@/app/components/NavMobile";
import NavDesktop from "@/app/components/NavDesktop";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useLenis from "@/app/hooks/useLenis";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const [isInitialized, setIsInitialized] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { y: currentScrollY } = useWindowScroll();

  // Check for inactivity every second
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now();
      const inactiveTime = now - lastActivityRef.current;

      if (inactiveTime >= 1500 && isNavVisible && currentScrollY > 50) {
        setIsNavVisible(false);
      }
    };

    const intervalId = setInterval(checkInactivity, 1000);

    return () => clearInterval(intervalId);
  }, [isNavVisible, currentScrollY]);

  useEffect(() => {
    lastActivityRef.current = Date.now();

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

  // Scroll-based visibility
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
    <div ref={containerRef} className="xs:top-3 fixed inset-x-0 top-2 z-40">
      <div className="xs:px-4 mx-auto w-full max-w-[1000px] px-2">
        <header className="bg-background/30 border-grid-line xs:px-8 xs:py-4 relative z-30 overflow-x-hidden rounded-xl border px-4 py-3 backdrop-blur-md">
          <div className="mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="relative z-50 py-4"
              onClick={(e) => {
                if (lenis) {
                  e.preventDefault();
                  lenis.scrollTo(0, {
                    duration: 2.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  });
                  window.history.pushState(null, "", "/");
                }
              }}
            >
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
