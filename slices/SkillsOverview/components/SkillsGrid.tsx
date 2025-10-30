"use client";

import { Content, GroupField } from "@prismicio/client";
import { Simplify } from "@/prismicio-types";
import ProficiencyMeter from "@/slices/SkillsOverview/components/ProficiencyMeter";

import { getIconPath } from "@/app/lib/utils";

const SkillsGrid = ({
  skills,
}: {
  skills: GroupField<
    Simplify<Content.SkillsOverviewSliceDefaultPrimarySkillsItem>
  >;
}) => {
  return (
    <div className="mt-10 grid w-full max-w-[880px] grid-cols-3 gap-4 self-center sm:mt-20 sm:grid-cols-3 sm:gap-12 md:grid-cols-4">
      {skills.map((item, index) => {
        const iconName = getIconPath(item.name);

        return (
          <div
            key={`${item.name}-${index}`}
            className="flex flex-col items-center justify-center sm:gap-4"
            data-cursor-img={`/assets/icons/${iconName}.svg`}
            data-cursor="-hide-dot"
          >
            <ProficiencyMeter
              score={item.score}
              size={100}
              delay={0.2 * index}
              className="scale-70 sm:mb-2 sm:scale-80 md:scale-90 lg:scale-100"
              useGradient
              textSize="text-3xl"
              id={`skill-${index}`}
            />

            <span className="text-center text-xs text-text-tertiary sm:text-sm">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsGrid;
