import { Button, PagesHeader } from "../../components";

const ShopNowButton = () => (
  <Button variant={"ghost"} size={"ghostsize"}>
    Shop Now
  </Button>
);

const ArrivalProductsGrid = () => {
  return (
    <section className="arrival-products-container flex flex-col gap-10 lg:gap-20">
      <PagesHeader subHeading="Featured" Heading="New Arrivals" cta />

      <div className="grid h-[500px] grid-cols-2 grid-rows-2 gap-4 md:h-[400px] md:grid-cols-4 lg:h-[600px]">
        <div className="col-span-2 flex items-end rounded-sm bg-foreground bg-[url(/new-arrivals/gaming.png)] bg-contain bg-bottom bg-no-repeat p-4 md:row-span-2 md:p-6 lg:bg-auto lg:p-10">
          <div className="space-y-2 md:space-y-4">
            <div className="space-y-1 text-background">
              <h3 className="text-base md:text-[26px] lg:text-2xl">
                Playstation 5
              </h3>
              <p className="text-xs tracking-wide text-background/60 md:text-base">
                Experience the next generation of gaming
              </p>
              <ShopNowButton />
            </div>
          </div>
        </div>
        <div className="col-span-2 flex items-end rounded-sm bg-foreground bg-[url(/new-arrivals/woman.png)] bg-contain bg-right bg-no-repeat p-4 shadow-[inset_-100px_0_100px_10px_rgba(255,255,255,0.2)] md:p-6 lg:bg-contain lg:p-10">
          <div className="space-y-2 md:space-y-4">
            <div className="space-y-1 text-background">
              <h3 className="text-sm md:text-base lg:text-2xl">
                Playstation 5
              </h3>
              <p className="text-xs tracking-wide text-background/60 md:text-base">
                Experience the next generation of gaming
              </p>
            </div>
            <ShopNowButton />
          </div>
        </div>
        <div className="relative flex items-end rounded-sm bg-foreground bg-[url(/new-arrivals/alexa.png)] bg-contain bg-center bg-no-repeat p-10 lg:bg-auto">
          {/* img */}

          <div className="absolute bottom-0 left-0 space-y-2 p-2 md:space-y-4 md:p-4 lg:p-10">
            <div className="space-y-1 text-background">
              <h3 className="text-xs md:text-base lg:text-xl">Playstation 5</h3>
              <p className="hidden md:text-sm lg:block">
                Experience the next generation of gaming
              </p>
            </div>
            <ShopNowButton />
          </div>
        </div>

        <div className="relative flex items-end rounded-sm bg-foreground bg-[url(/new-arrivals/perfume.png)] bg-contain bg-center bg-no-repeat p-14 md:p-10 lg:bg-auto">
          {/* img */}

          <div className="absolute bottom-0 left-0 space-y-2 p-2 md:space-y-4 md:p-4 lg:p-10">
            <div className="space-y-1 text-background">
              <h3 className="text-xs md:text-base lg:text-xl">Playstation 5</h3>
              <p className="hidden md:text-sm lg:block">
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
