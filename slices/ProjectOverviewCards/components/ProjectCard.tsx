import React, { FC } from "react";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import ScrollHint from "@/app/components/ScrollHint";
import ProjectMarquee from "./ProjectMarquee";
import ProjectDetails from "./ProjectDetails";
import type { ProjectCardProps } from "../types";

const ProjectCard: FC<ProjectCardProps> = ({
  card,
  index,
  isFirst,
  scrollHintRef,
  refs,
}) => {
  const {
    marqueeRef,
    cardImgWrapperRef,
    cardImgRef,
    projectImgRef,
    eyebrowRef,
    descriptionRef,
    techIconsRef,
    cardActionsRef,
    detailsContainerRef,
  } = refs;

  return (
    <div className="card" key={index}>
      <ProjectMarquee
        marquee={card.marquee}
        isFirst={isFirst}
        ref={marqueeRef}
      />

      <div className="card-wrapper">
        <div className="card-content">
          {isFirst && scrollHintRef && (
            <div
              ref={scrollHintRef}
              className="absolute top-1/2 left-1/2 -ml-6 -translate-x-1/2 -translate-y-1/2 transform sm:-ml-4"
            >
              <ScrollHint />
            </div>
          )}

          <div className="project-image-container">
            <div
              ref={index === 0 ? projectImgRef : undefined}
              className="project-image"
            >
              <PrismicNextImage
                field={card.project_image}
                alt=""
                quality={90}
                className="object-cover grayscale-25 will-change-transform"
                priority={index === 0}
              />
            </div>
          </div>

          <ProjectDetails
            card={card}
            index={index}
            refs={{
              detailsContainerRef,
              eyebrowRef,
              descriptionRef,
              cardActionsRef,
              techIconsRef,
            }}
          />
        </div>

        <div
          ref={index === 0 ? cardImgWrapperRef : undefined}
          className="card-img"
        >
          <Image
            ref={index === 0 ? cardImgRef : undefined}
            src="/assets/images/project-bg-reversed.jpg"
            alt="Background"
            fill
            quality={90}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
