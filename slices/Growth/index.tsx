import React, { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import GrowthHeader from "@/slices/Growth/components/GrowthHeader";
import StudyEntry from "@/slices/Growth/components/StudyEntry";
import TiltedCard from "@/slices/Growth/components/TiltedCard";
import { PrismicNextImage } from "@prismicio/next";

export type GrowthProps = SliceComponentProps<Content.GrowthSlice>;

const Growth: FC<GrowthProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-2 sm:mt-24"
      id="growth"
    >
      <GrowthHeader
        heading={slice.primary.heading}
        subheading={slice.primary.subheading}
        body={slice.primary.body}
      />

      <ul className="group/list flex flex-col gap-y-4 sm:gap-y-10">
        {slice.primary.study_entries.map((study, index) => (
          <StudyEntry key={`${study.title}-${index}`} study={study} />
        ))}
      </ul>

      <div className="flex min-h-screen items-center justify-center">
        <TiltedCard
          imageField={slice.primary.stairway_image}
          mantra={slice.primary.mantra_image}
          altText="Original photo by Mahdi Dastmard on Unsplash"
          containerWidth="500px"
          imageHeight={550}
          imageWidth={500}
          scaleOnHover={1.05}
          rotateAmplitude={12}
          showTooltip={false}
          displayOverlayContent={true}
          overlayContent={
            <React.Fragment>
              <PrismicNextImage
                field={slice.primary.punchline_image}
                alt=""
                className="absolute top-0 left-0 transition-opacity delay-150 duration-800 ease-in-out group-hover:opacity-100 xs:opacity-0"
              />
              <PrismicNextImage field={slice.primary.silhouette_image} alt="" />
            </React.Fragment>
          }
        />
      </div>
    </Bounded>
  );
};

export default Growth;
