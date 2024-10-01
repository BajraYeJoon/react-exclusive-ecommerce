import { CustomBreakcrumb } from "../../../user-portal/components";
import BrandSection from "./brands/BrandsSection";
import SpotlightSection from "./brands/SpotlightSection";

export const HomeCollections = () => {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle, rgba(42,32,47,1) 0%, rgba(62,45,63,1) 49%, rgba(70,46,54,1) 84%, rgba(141,100,92,1) 100%)",
      }}
    >
      <section className="relative mx-72 flex flex-col gap-4 py-4 max-2xl:mx-6">
        <CustomBreakcrumb
          breadcrumbTitle="Collections"
          className="text-white"
        />

        <div className="home-collections-container flex w-full flex-col items-center justify-center gap-7">
          {/* Top Banner */}
          <div className="relative h-[150px] w-full overflow-hidden rounded-lg bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779310/exclusive/public/spotlight/spotlight-banner_cako6u.jpg')] bg-cover bg-top bg-no-repeat md:h-[300px] lg:h-[400px]">
            <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-gray-700 to-transparent opacity-55"></div>

            <h1 className="absolute bottom-4 left-0 right-0 px-3 text-center text-sm font-bold leading-none tracking-wider text-white sm:text-base md:text-center md:text-7xl md:leading-10 lg:text-6xl">
              Get Access to the Best
              <br className="hidden md:block" /> Exclusive Collections
            </h1>
          </div>

          <div className="sm*:h-56 grid h-fit w-full grid-cols-1 gap-4 *:h-44 *:w-full *:rounded-md sm:grid-cols-2 md:h-[900px] md:grid-cols-6 md:grid-rows-8 md:*:h-full">
            <BrandSection
              logoSrc="https://res.cloudinary.com/dw55twddi/image/upload/v1727779305/exclusive/public/logo/champion_rqduks.svg"
              brandName="Champion"
              slideDelay={2000}
              logoWidth="w-24"
              className="md:col-span-2 md:row-span-3"
            />
            <BrandSection
              logoSrc="https://res.cloudinary.com/dw55twddi/image/upload/v1727779306/exclusive/public/logo/dior_zjc4ah.png"
              brandName="Dior"
              slideDelay={4000}
              logoWidth="w-24"
              className="md:col-span-2 md:row-span-3"
            />
            <BrandSection
              logoSrc="https://res.cloudinary.com/dw55twddi/image/upload/v1727779306/exclusive/public/logo/hm_odzqyc.svg"
              brandName="H&M"
              slideDelay={3000}
              logoWidth="w-12"
              className="md:col-span-2 md:row-span-3"
            />
            <SpotlightSection
              imgSrc="https://res.cloudinary.com/dw55twddi/image/upload/v1727779311/exclusive/public/spotlight/spotlight-img2_hoo9wv.webp"
              className="md:col-span-3 md:row-span-2 md:row-start-4"
            />
            <BrandSection
              logoSrc="https://res.cloudinary.com/dw55twddi/image/upload/v1727779306/exclusive/public/logo/prada_phw4ta.svg"
              brandName="Prada"
              slideDelay={7000}
              logoWidth="w-24"
              className="md:col-span-3 md:row-span-3"
            />
            <BrandSection
              logoSrc="https://res.cloudinary.com/dw55twddi/image/upload/v1727779306/exclusive/public/logo/zara_zi0wtg.svg"
              brandName="Zara"
              slideDelay={4000}
              logoWidth="w-16"
              className="md:col-span-3 md:row-span-3 md:row-start-6"
            />
            <SpotlightSection
              imgSrc="https://res.cloudinary.com/dw55twddi/image/upload/v1727779310/exclusive/public/spotlight/louis_mgcfhq.webp"
              className="md:col-span-3 md:row-span-2"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

