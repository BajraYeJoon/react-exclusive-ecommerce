import { Link } from "react-router-dom";
import { PagesHeader } from "../../../user-portal/components";
import { UserRoutes } from "../../../user-portal/utils/userLinks";
import { SpotLightHome } from "./SpotLightHome";
import SpotlightDiscount from "./SpotlightDiscount";
import { Badge } from "../../ui/badge";
import { CircleCheckBig, Truck } from "lucide-react";

const Spotlight = () => {
  return (
    <section className="spotlight-card-container flex h-fit flex-col gap-5 border-b border-foreground/30 pb-8 md:gap-7 md:pb-14">
      <PagesHeader
        Heading="Spotlight"
        subHeading="Discover the latest products from our store"
      />

      <div className="spotlight-card-selector grid cursor-pointer grid-cols-4 gap-3 *:grid *:h-[400px] *:w-full *:grid-rows-[2fr_0.8fr] *:bg-gray-400">
        <Link to={`/${UserRoutes.Discount}`}>
          <SpotlightDiscount />
        </Link>
        <Link to={`/${UserRoutes.Spotlight}`}>
          <SpotLightHome />
        </Link>
        <Link to={`/${UserRoutes.Halloweeen}`}>
          <div className="bg-blend relative flex flex-col items-center justify-center gap-2 bg-[url('/spotlight/halloween.avif')] bg-cover bg-center bg-no-repeat text-white">
            <p className="font-creepster text-base">
              Irresistible products & Discounts
            </p>
            <h3 className="font-creepster max-w-52 text-center text-5xl text-green-500">
              Halloween Deals
            </h3>
            <div className="absolute bottom-2">
              <Badge className="bg-gray-700 text-green-200">
                <Truck size={16} className="mr-2" />
                Quick shipping
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center justify-center gap-5 p-4 text-white">
            <div className="flex flex-col items-center justify-center font-bold tracking-wider">
              <h4 className="text-xl">Starting at</h4>
              <p className="text-4xl">$1.99</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-xs">
              <p className="font-medium">Shop Now Pay later</p>
              <p>
                . with{" "}
                <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs">
                  esewa
                </span>
              </p>
              <span className="text-center text-[8px] font-light">
                * Terms and conditions apply.
              </span>
            </div>
          </div>
        </Link>
        <Link to={`/${UserRoutes.Brands}`}>
          <div className="bg-blend relative flex flex-col items-center justify-center gap-2 bg-[url('/spotlight/brand.webp')] bg-cover bg-top bg-no-repeat text-white"></div>
          <div className="flex items-center justify-center text-3xl font-extrabold capitalize italic tracking-wider text-white">
            Brand Z
            <CircleCheckBig
              className="ml-1 font-extrabold text-yellow-500"
              size={30}
            />
            ne
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Spotlight;
