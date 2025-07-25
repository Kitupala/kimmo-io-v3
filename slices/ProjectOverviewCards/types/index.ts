import React from "react";
import { SliceComponentProps } from "@prismicio/react";
import {
  Content,
  ImageField,
  KeyTextField,
  LinkField,
  RichTextField,
} from "@prismicio/client";
import {
  ProjectOverviewCardSliceDefaultPrimaryProjectItem,
  Simplify,
} from "@/prismicio-types";

export type ProjectOverviewCardProps =
  SliceComponentProps<Content.ProjectOverviewCardSlice>;

export interface CardRefs {
  marqueeRef: React.RefObject<HTMLDivElement | null>;
  cardImgWrapperRef: React.RefObject<HTMLDivElement | null>;
  cardImgRef: React.RefObject<HTMLImageElement | null>;
  projectImgRef: React.RefObject<HTMLDivElement | null>;
  eyebrowRef: React.RefObject<HTMLDivElement | null>;
  descriptionRef: React.RefObject<HTMLDivElement | null>;
  techIconsRef: React.RefObject<HTMLDivElement | null>;
  cardActionsRef: React.RefObject<HTMLDivElement | null>;
  detailsContainerRef: React.RefObject<HTMLDivElement | null>;
}

export interface ProjectData {
  marquee?: KeyTextField;
  project_image: ImageField;
  project_title: KeyTextField;
  eyebrow: KeyTextField;
  project_description: RichTextField;
  repository_link: LinkField;
  deployment_link: LinkField;
  technologies: KeyTextField;
}

export interface ProjectCardProps {
  card: Simplify<ProjectOverviewCardSliceDefaultPrimaryProjectItem>;
  index: number;
  isFirst: boolean;
  scrollHintRef: React.RefObject<HTMLDivElement | null> | null;
  refs: CardRefs;
}

export interface CardContent {
  eyebrow: Element | null;
  titleChars: Element[] | null;
  description: HTMLDivElement | null;
  progressBar: Element | null;
  techIcons: Element | null;
  cardActions: Element | null;
  projectImage: Element | null;
  detailsContainer: Element | null;
}

export interface ProgressBarProps {
  ref: React.RefObject<HTMLDivElement | null>;
  innerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  isLastCardVisible: boolean;
  isInNextSection: boolean;
}

export interface IntroSectionProps {
  heading: RichTextField;
  description: RichTextField;
}

export interface ProjectDetailsProps {
  card: ProjectData;
  index: number;
  refs: {
    detailsContainerRef: React.RefObject<HTMLDivElement | null>;
    eyebrowRef: React.RefObject<HTMLDivElement | null>;
    descriptionRef: React.RefObject<HTMLDivElement | null>;
    cardActionsRef: React.RefObject<HTMLDivElement | null>;
    techIconsRef: React.RefObject<HTMLDivElement | null>;
  };
}

export interface ProjectMarqueeProps {
  marquee?: KeyTextField;
  isFirst: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
}
