import React, { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import SkillsHeader from "@/slices/SkillsOverview/components/SkillsHeader";
import SkillsGrid from "@/slices/SkillsOverview/components/SkillsGrid";
import AboutSection from "@/slices/SkillsOverview/components/AboutSection";
import { Bounded } from "@/app/components/Bounded";

export type SkillsOverviewProps =
  SliceComponentProps<Content.SkillsOverviewSlice>;

const SkillsOverview: FC<SkillsOverviewProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center space-y-10 pt-[10%]"
    >
      <SkillsHeader heading={slice.primary.heading} body={slice.primary.body} />
      <SkillsGrid skills={slice.primary.skills} />
      <AboutSection slice={slice} />
    </Bounded>
  );
};

export default SkillsOverview;
