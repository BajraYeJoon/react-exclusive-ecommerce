import { CircleCheckBig } from "lucide-react";

export default function SpotlightBrand() {
  return (
    <>
      <div className="bg-blend relative flex flex-col items-center justify-center gap-2 bg-[url('/spotlight/brand.png')] bg-cover bg-top bg-no-repeat text-white"></div>
      <div className="flex items-center justify-center text-lg font-extrabold capitalize italic tracking-wider text-white sm:text-xl md:text-3xl">
        Brand Z
        <CircleCheckBig
          className="ml-1 font-extrabold text-yellow-500"
          size={30}
        />
        ne
      </div>
    </>
  );
}
