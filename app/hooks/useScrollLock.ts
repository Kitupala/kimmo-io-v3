import { useEffect } from "react";
import type Lenis from "lenis";

export const useScrollLock = (isActive: boolean, lenis: Lenis | null) => {
  useEffect(() => {
    if (!lenis) return;

    if (isActive) {
      lenis.stop();
      document.body.style.overflow = "hidden";
      document.body.classList.add("blurred");
    } else {
      lenis.start();
      document.body.style.overflow = "";
      document.body.classList.remove("blurred");
    }

    return () => {
      lenis.start();
      document.body.style.overflow = "";
      document.body.classList.remove("blurred");
    };
  }, [isActive, lenis]);
};
