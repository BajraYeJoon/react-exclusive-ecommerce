import { Button, PagesHeader } from "../../components";

const ArrivalProductsGrid = () => {
  return (
    <section className="arrival-products-container flex flex-col lg:gap-20 gap-10">
      <PagesHeader subHeading="Featured" Heading="New Arrivals" cta />

      <div className="grid grid-cols-4 grid-rows-2 h-[600px] gap-10 ">
        <div className="col-span-2 row-span-2 bg-foreground flex items-end p-10 rounded-sm">
          <div className="space-y-4">
            <div className="text-background space-y-1">
              <h3 className="text-[26px] capitalize lg:text-2xl ">
                Playstation 5
              </h3>
              <p className="text-base">
                Experience the next generation of gaming
              </p>
            </div>
            <Button variant={"ghost"} size={"ghostsize"}>
              Shop Now
            </Button>
          </div>
        </div>
        <div className="col-span-2 flex items-end p-10 rounded-sm  bg-foreground ">
          <div className="space-y-4">
            <div className="text-background space-y-1">
              <h3 className="text-[26px] capitalize lg:text-2xl ">
                Playstation 5
              </h3>
              <p className="text-base">
                Experience the next generation of gaming
              </p>
            </div>
            <Button variant={"ghost"} size={"ghostsize"}>
              Shop Now
            </Button>
          </div>
        </div>
        <div className="flex items-end p-10 rounded-sm bg-foreground relative">
          {/* img */}
          <div className="h-52 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] " />
          <div className="space-y-4 absolute bottom-0 left-0 p-10">
            <div className="text-background space-y-1">
              <h3 className="text-[26px] capitalize lg:text-2xl ">
                Playstation 5
              </h3>
              <p className="text-base">
                Experience the next generation of gaming
              </p>
            </div>
            <Button variant={"ghost"} size={"ghostsize"}>
              Shop Now
            </Button>
          </div>
        </div>

        <div className="flex items-end p-10 rounded-sm bg-foreground relative">
          {/* img */}
          <div className="h-52 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] " />
          <div className="space-y-4 absolute bottom-0 left-0 p-10">
            <div className="text-background space-y-1">
              <h3 className="text-[26px] capitalize lg:text-2xl ">
                Playstation 5
              </h3>
              <p className="text-base">
                Experience the next generation of gaming
              </p>
            </div>
            <Button variant={"ghost"} size={"ghostsize"}>
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArrivalProductsGrid;
