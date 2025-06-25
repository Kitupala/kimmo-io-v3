import React from "react";
import { useLenis } from "@/app/hooks/useLenis";

const ScrollControls = () => {
  const lenis = useLenis();

  if (!lenis) return null;

  const setSuperSlow = () => {
    lenis.options.duration = 5.0;
    lenis.options.wheelMultiplier = 0.15;
    console.log("Set to super slow mode");
  };

  const setMedium = () => {
    lenis.options.duration = 1.2;
    lenis.options.wheelMultiplier = 1.0;
    console.log("Set to medium mode");
  };

  const setSuperFast = () => {
    lenis.options.duration = 0.5;
    lenis.options.wheelMultiplier = 2.0;
    console.log("Set to super fast mode");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex gap-2 rounded-lg bg-black/80 p-2 text-sm text-white">
      <button
        onClick={setSuperSlow}
        className="rounded bg-blue-500 px-2 py-1 hover:bg-blue-600"
      >
        Super Slow
      </button>
      <button
        onClick={setMedium}
        className="rounded bg-green-500 px-2 py-1 hover:bg-green-600"
      >
        Medium
      </button>
      <button
        onClick={setSuperFast}
        className="rounded bg-red-500 px-2 py-1 hover:bg-red-600"
      >
        Super Fast
      </button>
    </div>
  );
};

export default ScrollControls;
