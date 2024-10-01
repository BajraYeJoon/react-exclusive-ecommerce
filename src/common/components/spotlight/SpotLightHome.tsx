import { spotlightModel } from "../../lib/utils/constant";

export const SpotLightHome = () => {
  return (
    <>
      {" "}
      <div className="group grid min-h-fit grid-cols-3">
        {spotlightModel.map((spotlight) => (
          <div className="relative h-full sm:h-24 md:h-36" key={spotlight.id}>
            <img
              src={spotlight.image}
              alt={spotlight.brand}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black to-transparent opacity-55"></div>
            <h3 className="absolute bottom-0 left-0 right-0 flex justify-center p-1 text-[8px] font-extralight tracking-wider text-white md:text-sm">
              {spotlight.brand}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-0 text-white group-hover:cursor-pointer sm:flex-row sm:gap-2">
        <h4 className="text-sm font-extrabold uppercase tracking-wide sm:text-[1.3rem] md:text-[1.5rem]">
          Exclusive
        </h4>
        <p className="text-[1.5rem] text-sm font-light tracking-tight sm:text-[1.3rem]">
          Collections
        </p>
      </div>
    </>
  );
};
