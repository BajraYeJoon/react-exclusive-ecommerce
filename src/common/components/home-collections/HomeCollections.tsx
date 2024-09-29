import { CustomBreakcrumb } from "../../../user-portal/components";
import BrandSection from "./brands/BrandsSection";
import SpotlightSection from "./brands/SpotlightSection";

const HomeCollections = () => {
  return (
    <section className="mx-72 my-6 flex flex-col gap-4 max-2xl:mx-6">
      <CustomBreakcrumb breadcrumbTitle="Collections" />

      <div className="home-collections-container flex w-full flex-col items-center justify-center gap-7">
        {/* Top Banner */}
        <div className="relative h-[150px] w-full overflow-hidden rounded-2xl bg-[url('/spotlight/spotlight-banner.jpg')] bg-cover bg-top bg-no-repeat md:h-[300px] lg:h-[400px]">
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-gray-700 to-transparent opacity-55"></div>

          <h1 className="absolute bottom-4 left-0 right-0 px-3 text-center text-sm font-bold leading-none tracking-wider text-white sm:text-base md:text-center md:text-7xl md:leading-10 lg:text-6xl">
            Get Access to the Best
            <br className="hidden md:block" /> Exclusive Collections
          </h1>
        </div>

        <div className="grid h-fit w-full grid-cols-1 gap-4 *:h-44 *:w-full *:rounded-2xl md:h-[900px] md:grid-cols-6 md:grid-rows-8 md:*:h-full">
          <BrandSection
            logoSrc="/logo/champion.svg"
            brandName="Champion"
            slideDelay={2000}
            logoWidth="w-24"
            className="md:col-span-2 md:row-span-3"
          />
          <BrandSection
            logoSrc="/logo/dior.png"
            brandName="Dior"
            slideDelay={4000}
            logoWidth="w-24"
            className="md:col-span-2 md:row-span-3"
          />
          <BrandSection
            logoSrc="/logo/hm.svg"
            brandName="H&M"
            slideDelay={3000}
            logoWidth="w-12"
            className="md:col-span-2 md:row-span-3"
          />
          <SpotlightSection
            imgSrc="/spotlight/spotlight-img2.webp"
            className="md:col-span-3 md:row-span-2 md:row-start-4"
          />
          <BrandSection
            logoSrc="/logo/prada.svg"
            brandName="Prada"
            slideDelay={7000}
            logoWidth="w-24"
            className="md:col-span-3 md:row-span-3"
          />
          <BrandSection
            logoSrc="/logo/zara.svg"
            brandName="Zara"
            slideDelay={4000}
            logoWidth="w-16"
            className="md:col-span-3 md:row-span-3 md:row-start-6"
          />
          <SpotlightSection
            imgSrc="/spotlight/louis.webp"
            className="md:col-span-3 md:row-span-2"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeCollections;
