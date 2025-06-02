import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import AnimatedText from "@/app/components/AnimatedText";

export type ProjectOverviewCardProps =
  SliceComponentProps<Content.ProjectOverviewCardSlice>;

const ProjectOverviewCard: FC<ProjectOverviewCardProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xs:mt-96 fade-stripe mt-[17.5rem] mb-12 ml-28 h-[900px] md:mt-[30rem]"
    >
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <AnimatedText
                as="h2"
                className="text-text-secondary kerning-none xs:text-xl text-base font-light md:text-3xl"
                splitType="words"
                gradient
              >
                {children}
              </AnimatedText>
            ),
          }}
        />
      )}

      {isFilled.richText(slice.primary.description) && (
        // <PrismicRichText field={slice.primary.description} />
        <PrismicRichText
          field={slice.primary.description}
          components={{
            paragraph: ({ children }) => (
              <p className="text-text-secondary xs:text-xl max-w-2/3 text-base font-light md:text-lg">
                {children}
              </p>
            ),
          }}
        />
      )}
    </Bounded>
  );
};

export default ProjectOverviewCard;
