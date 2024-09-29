import { Link } from "react-router-dom";
import { PagesHeader } from "../../../user-portal/components";
import { spotlightModel } from "../../lib/utils/constant";
import { UserRoutes } from "../../../user-portal/utils/userLinks";

const Spotlight = () => {
  return (
    <section className="spotlight-card-container flex h-fit flex-col gap-5 border-b border-foreground/30 pb-8 md:gap-7 md:pb-14">
      <PagesHeader
        Heading="Spotlight"
        subHeading="Discover the latest products from our store"
      />

      <Link to={`/${UserRoutes.Spotlight}`}>
        <div className="spotlight-card-selector grid cursor-pointer grid-cols-4 gap-3 *:grid *:h-[400px] *:w-full *:grid-rows-[2fr_0.8fr] *:bg-red-300">
          <div>
            <div>1</div>
            <div className="">2</div>
          </div>
          <div className="">
            <div className="grid min-h-fit grid-cols-3">
              {spotlightModel.map((spotlight) => (
                <div className="relative h-36" key={spotlight.id}>
                  <img
                    src={spotlight.image}
                    alt={spotlight.brand}
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black to-transparent opacity-55"></div>
                  <h3 className="absolute bottom-0 left-0 right-0 flex justify-center p-1 text-sm font-extralight tracking-wider text-white">
                    {spotlight.brand}
                  </h3>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <h4 className="text-3xl font-extrabold uppercase tracking-wide">
                Exclusive
              </h4>
              <p className="text-3xl font-light tracking-tighter">
                Collections
              </p>
            </div>
          </div>
          <div>
            <div>1</div>
            <div>2</div>
          </div>
          <div>
            <div>1</div>
            <div>2</div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Spotlight;
