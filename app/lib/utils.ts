import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { KeyTextField } from "@prismicio/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Maps a skill name to its corresponding icon path
 * Handles special cases and normalizes names
 */
export const getIconPath = (skillName: KeyTextField): string => {
  const exactMatchMap: { [key: string]: string } = {
    "tailwind css": "tailwindcss",
    nextjs: "nextjs-plain",
  };

  const lowerName = skillName?.toLowerCase();
  if (lowerName && exactMatchMap[lowerName]) {
    return exactMatchMap[lowerName];
  }

  const normalizedName = lowerName?.replace(/[^a-z0-9]/g, "");

  const iconMap: { [key: string]: string } = {
    html: "html5",
    css3: "css3",
    javascript: "javascript",
    typescript: "typescript",
    react: "react",
    nextjs: "nextjs-plain",
    tailwindcss: "tailwindcss",
    gsap: "gsap",
    shadcn: "shadcn",
    figma: "figma",
    git: "git",
  };

  if (normalizedName && iconMap[normalizedName]) {
    return iconMap[normalizedName];
  }

  // As a last resort, check for substring matches
  // Sort keys by length (descending) to prefer longer matches
  const sortedKeys = Object.keys(iconMap).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    if (normalizedName?.includes(key)) {
      return iconMap[key];
    }
  }

  return "default";
};
