import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";

import { GitHubIcon } from "@/public/assets/icons/GitHubIcon";
import { ExternalLinkIcon } from "@/public/assets/icons/ExternalLinkIcon";
import TechIcons from "@/slices/ProjectOverviewCards/TechIcons";

import { ProjectDetailsProps } from "@/slices/ProjectOverviewCards/types";

const ProjectDetails = ({ card, index, refs }: ProjectDetailsProps) => {
  return (
    <div className="card-details-outer-container">
      <div
        ref={index === 0 ? refs.detailsContainerRef : undefined}
        className="card-details details-container"
      >
        <div
          ref={index === 0 ? refs.eyebrowRef : undefined}
          className="card-eyebrow"
        >
          <span>{card.eyebrow}</span>
        </div>

        <div className="flex w-full flex-col lg:flex-row">
          <div className="card-title">
            <h3>{card.project_title}</h3>
          </div>

          <div className="min-w-1/2 border-grid-line-bright py-6 pr-6 lg:border-l lg:pl-12">
            <div
              ref={index === 0 ? refs.descriptionRef : undefined}
              className="card-description"
            >
              <PrismicRichText field={card.project_description} />
            </div>

            {/* LINKS */}
            <div
              ref={index === 0 ? refs.cardActionsRef : undefined}
              className="card-actions flex gap-6"
            >
              {isFilled.link(card.repository_link) && (
                <PrismicLink
                  field={card.repository_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link group"
                  aria-label="Visit GitHub repository"
                  data-cursor="-inverse"
                >
                  <span className="icon-wrapper">
                    <GitHubIcon className="size-4 md:size-5" />
                  </span>
                  <span>GitHub</span>
                </PrismicLink>
              )}

              {isFilled.link(card.deployment_link) && (
                <PrismicLink
                  field={card.deployment_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link group"
                  aria-label="Visit live site"
                  data-cursor="-inverse"
                >
                  <span className="icon-wrapper">
                    <ExternalLinkIcon className="size-4 md:size-5" />
                  </span>
                  <span>Visit Site</span>
                </PrismicLink>
              )}
            </div>
          </div>
        </div>

        {card.technologies && (
          <div
            ref={index === 0 ? refs.techIconsRef : undefined}
            className="tech-icons-wrapper mt-12 md:mt-18"
          >
            <TechIcons technologies={card.technologies} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
