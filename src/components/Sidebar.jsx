import ThemesToggle from "./ThemesToggle";

export default function Sidebar() {
  return (
    <div className="pr-[32px] md:pr-0 w-full md:w-[103px] bg-[#373B53] h-auto md:h-screen flex justify-between rounded-none md:rounded-tr-[28px] md:rounded-br-[28px] md:flex-col md:z-[999] md:relative">
      <img
        className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] md:w-[103px] md:h-[103px]"
        src="./logo.svg"
        alt=""
      />
      <div className="flex items-center md:flex-col md:gap-6 justify-center">
        <ThemesToggle />
        <hr className="h-[72px] sm:w-[1px] sm:h-[80px] md:w-full md:h-[1px] border border-[#494E6E] mx-[24px] sm:mx-[32px] md:mx-0" />
        <img
          src="./user.svg"
          alt=""
          className="md:w-10 md:h-10 md:mb-6 md:mx-auto"
        />
      </div>
    </div>
  );
}
