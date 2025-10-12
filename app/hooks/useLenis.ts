import { useEffect } from "react";
import { useLenisContext } from "@/app/components/LenisProvider";
import type { LenisOptions } from "lenis";

export const useLenis = (options?: Partial<LenisOptions>) => {
  const lenis = useLenisContext();

  useEffect(() => {
    if (!lenis || !options) return;

    const originalValues: Record<string, unknown> = {};

    Object.entries(options).forEach(([key, value]) => {
      const optionKey = key as keyof LenisOptions;

      if (value !== undefined) {
        originalValues[key] = lenis.options[optionKey];

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - We know this is valid as it comes from options
        lenis.options[optionKey] = value;
      }
    });

    return () => {
      Object.entries(originalValues).forEach(([key, value]) => {
        const optionKey = key as keyof LenisOptions;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - We know this is valid as it was saved from original options
        lenis.options[optionKey] = value;
      });
    };
  }, [lenis, options]);

  return lenis;
};
