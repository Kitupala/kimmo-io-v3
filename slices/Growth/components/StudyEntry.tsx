"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/app/lib/gsap";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import {
  GrowthSliceDefaultPrimaryStudyEntriesItem,
  Simplify,
} from "@/prismicio-types";

import CertificateDialog from "@/slices/Growth/components/CertificateDialog";
import BadgeList from "@/slices/Growth/components/BadgeList";

interface StudyEntryProps {
  study: Simplify<GrowthSliceDefaultPrimaryStudyEntriesItem>;
}

const StudyEntry = ({ study }: StudyEntryProps) => {
  const liRef = useRef<HTMLLIElement>(null);

  const {
    date_range,
    title,
    provider,
    provider_link,
    description,
    certificate,
    technologies,
  } = study;

  const techArray = technologies
    ? technologies.split(",").map((tech) => tech.trim())
    : [];

  useGSAP(() => {
    const element = liRef.current;
    if (!element) return;

    gsap.set(element, {
      autoAlpha: 0,
      filter: "blur(15px)",
      y: 30,
      scale: 0.95,
    });

    let scrollTrigger: ScrollTrigger | null = null;

    const setupAnimation = () => {
      scrollTrigger = ScrollTrigger.create({
        trigger: element,
        start: "top bottom-=50",
        once: true,
        onEnter: () => {
          gsap.to(element, {
            autoAlpha: 1,
            filter: "blur(0px)",
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });

      ScrollTrigger.refresh();
    };

    setTimeout(setupAnimation, 100);

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <li ref={liRef} className="flex flex-col justify-center">
      <div className="study-entry">
        <p className="pt-1 text-[11px] uppercase sm:text-center sm:text-[13px]">
          {date_range}
        </p>
        <PrismicNextLink
          field={provider_link}
          className="group/link col-span-2 inline-flex flex-col md:pl-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>
            {title} ·&nbsp;
            <span className="inline-block">
              {provider}
              <span className="arrow" />
            </span>
          </h4>
          <PrismicRichText
            field={description}
            components={{
              paragraph: ({ children }) => (
                <p className="text-sm sm:text-base">{children}</p>
              ),
            }}
          />
          {techArray.length > 0 && <BadgeList items={techArray} />}
        </PrismicNextLink>

        <CertificateDialog
          certificate={certificate}
          title={title}
          provider={provider}
        />
      </div>
    </li>
  );
};

export default StudyEntry;
