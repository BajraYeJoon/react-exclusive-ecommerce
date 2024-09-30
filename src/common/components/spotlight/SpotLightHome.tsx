import { spotlightModel } from "../../lib/utils/constant";

export const SpotLightHome = () => {
  return (
    <>
      {" "}
      <div className="group grid min-h-fit grid-cols-3">
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
      <div className="flex items-center justify-center gap-2 text-white group-hover:cursor-pointer">
        <h4 className="text-[1.5rem] font-extrabold uppercase tracking-wide">
          Exclusive
        </h4>
        <p className="text-[1.5rem] font-light tracking-tight">Collections</p>
      </div>
    </>
  );
};
