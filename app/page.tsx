import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-full flex flex-col items-center justify-items-center">
      {/* BLURRED CIRCLE */}
      <div className="w-[950px] h-[950px] rounded-full bg-[#121416]/90  blur-[100px] absolute -top-4/6 -z-10" />

      {/* VERTICAL LINES*/}
      <div className="flex flex-row min-w-fit gap-[185px] md:gap-[229px] z-10">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="h-screen w-px bg-grid-line" />
          ))}
      </div>

      {/* CIRCLE WITH HERO IMAGE */}
      <div className="w-[480px] h-[480px] md:w-[594px] md:h-[594px] mt-24 absolute rounded-full border border-grid-line">
        <Image
          src="/assets/images/hero.png"
          alt="Kitupala"
          width={594}
          height={594}
          className="absolute -z-20"
        />
      </div>

      {/* HORIZONTAL LINES */}
      <div className="flex flex-col gap-42 md:gap-50 items-center absolute mt-[460px] md:mt-[550px]">
        <div className="w-[370px] md:w-[460px] h-[1px] bg-grid-line" />
        <div className="w-screen md:w-[920px] h-[1px] bg-grid-line" />
      </div>
    </div>
  );
}
