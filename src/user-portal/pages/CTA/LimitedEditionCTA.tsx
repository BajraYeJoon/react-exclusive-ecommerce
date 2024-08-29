import { Button } from "../../../common/ui/button";

const timeUnits = [
  { unit: "Days", value: 20 },
  { unit: "Hours", value: 20 },
  { unit: "Minutes", value: 20 },
  { unit: "Seconds", value: 20 },
];

const LimitedEditionCTA = () => {
  return (
    <section className="flex flex-col items-center rounded-md bg-foreground py-10 md:flex-row md:rounded-none md:px-10 md:py-20 lg:px-16">
      <div className="flex flex-1 flex-col items-start justify-between gap-6 md:gap-8">
        <span className="text-lg capitalize text-accent max-2xl:text-base">
          Categories
        </span>
        <h2 className="max-w-xl text-background md:leading-[70px] lg:text-6xl">
          Enhance your music experience
        </h2>
        <div className="flex items-center gap-5">
          {timeUnits.map(({ unit, value }) => (
            <div
              key={unit}
              className="flex h-14 w-14 flex-col items-center justify-center -space-y-1 rounded-full bg-background md:h-14 md:w-14 lg:h-[80px] lg:w-[80px]"
            >
              <span className="font-bold">{value}</span>
              <p className="text-xs font-medium lg:text-sm">{unit}</p>
            </div>
          ))}
        </div>
        <Button className="w-full bg-green-500 md:w-fit">Buy Now</Button>
      </div>
      <img
        src="/limitededitioncta.webp"
        alt=""
        className="hidden h-12 w-auto object-contain drop-shadow-[0_0_100px_rgba(255,255,255,0.5)] md:block md:h-44 lg:h-72"
      />
    </section>
  );
};

export default LimitedEditionCTA;
