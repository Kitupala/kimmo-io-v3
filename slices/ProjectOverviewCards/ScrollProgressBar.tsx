"use client";

import { useState, useEffect } from "react";
import { useLenis } from "@/app/hooks/useLenis";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ progress }: { progress: number }) => {
      setScrollProgress(progress * 100);
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return (
    <div className="fixed left-0 top-0 h-1 w-full bg-gray-200">
      <div
        className="h-full bg-blue-500"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
