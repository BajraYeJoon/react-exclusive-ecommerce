import { Button, PagesHeader } from "../../components";

const ShopNowButton = () => (
  <Button variant={"ghost"} size={"ghostsize"}>
    Shop Now
  </Button>
);

const ArrivalProductsGrid = () => {
  return (
    <section className="arrival-products-container flex flex-col lg:gap-20 gap-10">
      <PagesHeader subHeading="Featured" Heading="New Arrivals" cta />

      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[500px] md:h-[600px] gap-4 ">
        <div className="col-span-2 md:row-span-2 bg-[url(/new-arrivals/gaming.png)] bg-foreground bg-no-repeat bg-contain md:bg-auto bg-bottom flex items-end p-4 md:p-10 rounded-sm">
          <div className="space-y-2 md:space-y-4">
            <div className="text-background space-y-1">
              <h3 className="text-base md:text-[26px]  lg:text-2xl ">
                Playstation 5
              </h3>
              <p className="text-xs md:text-base text-background/60 tracking-wide">
                Experience the next generation of gaming
              </p>
              <ShopNowButton />
            </div>
          </div>
        </div>
        <div className="col-span-2 flex items-end p-4 md:p-10 rounded-sm bg-[url(/new-arrivals/woman.png)] bg-foreground bg-no-repeat bg-contain md:bg-contain bg-right shadow-[inset_-100px_0_100px_10px_rgba(255,255,255,0.2)]">
          <div className="space-y-2 md:space-y-4">
            <div className="text-background space-y-1">
              <h3 className="text-sm md:text-[26px]  lg:text-2xl ">
                Playstation 5
              </h3>
              <p className="text-xs md:text-base text-background/60 tracking-wide">
                Experience the next generation of gaming
              </p>
            </div>
            <ShopNowButton />
          </div>
        </div>
        <div className="flex items-end p-10 rounded-sm bg-foreground relative bg-[url(/new-arrivals/alexa.png)] bg-no-repeat bg-contain bg-center md:bg-auto">
          {/* img */}

          <div className="space-y-2 md:space-y-4 absolute bottom-0 left-0 p-2 md:p-10">
            <div className="text-background space-y-1">
              <h3 className="text-xs md:text-[26px] capitalize lg:text-xl ">
                Playstation 5
              </h3>
              <p className="hidden md:block md:text-sm">
                Experience the next generation of gaming
              </p>
            </div>
            <ShopNowButton />
          </div>
        </div>

        <div className="flex items-end p-14 md:p-10 rounded-sm bg-foreground relative bg-[url(/new-arrivals/perfume.png)]  bg-no-repeat bg-contain md:bg-auto bg-center">
          {/* img */}

          <div className="space-y-2 md:space-y-4  absolute bottom-0 left-0 p-2 md:p-10">
            <div className="text-background space-y-1">
              <h3 className="text-xs md:text-[26px] capitalize lg:text-xl ">
                Playstation 5
              </h3>
              <p className="hidden md:block md:text-sm">
                Experience the next generation of gaming
              </p>
            </div>
            <ShopNowButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArrivalProductsGrid;
