"use client";

import { cn } from "@/app/lib/utils";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface TechIconsProps {
  technologies: string;
  classNames?: string;
}

const TechIcons = ({ technologies, classNames = "" }: TechIconsProps) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (tooltipRef.current) {
        gsap.fromTo(
          tooltipRef.current,
          {
            opacity: 0,
            y: 5,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          },
        );
      }
    },
    { scope: containerRef, dependencies: [activeTooltip] },
  );

  const iconMap: { [key: string]: string } = {
    appwrite: "/assets/icons/appwrite.svg",
    css3: "/assets/icons/css3.svg",
    express: "/assets/icons/express.svg",
    figma: "/assets/icons/figma.svg",
    github: "/assets/icons/github.svg",
    gitlab: "/assets/icons/gitlab.svg",
    gsap: "/assets/icons/gsap.svg",
    html5: "/assets/icons/html5.svg",
    javascript: "/assets/icons/javascript.svg",
    nextjs: "/assets/icons/nextjs.svg",
    postgresql: "/assets/icons/postgresql.svg",
    prismic: "/assets/icons/prismic.svg",
    react: "/assets/icons/react.svg",
    shadcn: "/assets/icons/shadcn.svg",
    supabase: "/assets/icons/supabase.svg",
    tailwindcss: "/assets/icons/tailwindcss.svg",
    threejs: "/assets/icons/threejs.svg",
    typescript: "/assets/icons/typescript.svg",
    vercel: "/assets/icons/vercel.svg",
  };

  const displayNameMap: { [key: string]: string } = {
    appwrite: "Appwrite",
    css3: "CSS3",
    express: "Express.js",
    figma: "Figma",
    github: "GitHub",
    gitlab: "GitLab",
    gsap: "GSAP",
    html5: "HTML5",
    javascript: "JavaScript",
    nextjs: "Next.js",
    postgresql: "PostgreSQL",
    prismic: "Prismic",
    react: "React",
    shadcn: "shadcn/ui",
    supabase: "Supabase",
    tailwindcss: "Tailwind CSS",
    threejs: "Three.js",
    typescript: "TypeScript",
    vercel: "Vercel",
  };

  if (!technologies) return null;

  const techArray = technologies
    .split(",")
    .map((tech) => tech.trim().toLowerCase())
    .filter((tech) => iconMap[tech]);

  return (
    <div ref={containerRef} className={cn("flex flex-wrap gap-6", classNames)}>
      {techArray.map((tech, index) => {
        const iconUrl = iconMap[tech];
        const displayName = displayNameMap[tech] || tech;
        if (!iconUrl) return null;

        return (
          <div
            key={index}
            className="tech-icon-container group relative"
            onMouseEnter={() => setActiveTooltip(tech)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="flex size-6 flex-col items-center justify-center lg:size-9">
              <img src={iconUrl} alt={displayName} className="object-contain" />

              {activeTooltip === tech && (
                <div
                  ref={tooltipRef}
                  className="tooltip bg-background/80 text-text-secondary/70 border-grid-line absolute -top-8 left-1/2 z-10 -translate-x-1/2 transform whitespace-nowrap rounded-sm border px-2 py-1 text-xs backdrop-blur-sm"
                >
                  {displayName}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechIcons;
