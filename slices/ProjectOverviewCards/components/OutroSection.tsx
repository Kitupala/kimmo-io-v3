import AnimatedText from "@/app/components/AnimatedText";
import Image from "next/image";
import Link from "next/link";

const OutroSection = () => {
  const content = (
    <>
      <span>Just the spark — </span>
      <span>
        the full blast of code and chaos lives on my{" "}
        <Link
          href="https://github.com/Kitupala"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold"
          aria-label="Link to GitHub profile"
          data-cursor="-inverse"
        >
          GitHub
        </Link>
        .
      </span>
    </>
  );

  return (
    <section id="studies" className="outro relative overflow-hidden">
      <div className="absolute -bottom-12 left-20 -z-10 h-[80%] w-full overflow-hidden mix-blend-exclusion">
        <Image
          src="/assets/images/chaos.jpg"
          alt=""
          fill
          priority
          className="mt-10 mask-b-from-60% mask-radial-[70%_50%] mask-radial-from-20% object-cover object-left opacity-20"
        />
      </div>

      <div className="relative z-10 mx-auto w-4/5 pt-32 text-center md:w-2/5">
        <AnimatedText
          as="h3"
          className="kerning-none text-xl leading-tight tracking-tighter text-text-secondary sm:text-3xl"
          splitType="words"
          stagger={0.05}
          duration={0.8}
          y={10}
          animateOnScroll={true}
          scrollTriggerOptions={{
            start: "top bottom-=100",
            once: true,
          }}
        >
          {content}
        </AnimatedText>
      </div>
    </section>
  );
};

export default OutroSection;
