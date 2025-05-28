import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-background/15 border-grid-line z-20 mx-4 mt-4 w-auto max-w-[1000px] rounded-xl border p-8 backdrop-blur-sm lg:mx-auto lg:w-full">
      <div className="mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={120}
            height={30}
            priority
            className="w-[80px] cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
