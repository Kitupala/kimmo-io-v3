import { ProjectMarqueeProps } from "@/slices/ProjectOverviewCards/types";
import { isFilled } from "@prismicio/client";

const ProjectMarquee = ({ marquee, isFirst, ref }: ProjectMarqueeProps) => {
  return (
    <>
      {isFilled.keyText(marquee) && (
        <div ref={isFirst ? ref : null} className="card-marquee">
          <div className="marquee">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <h3 key={idx}>{marquee}</h3>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectMarquee;
