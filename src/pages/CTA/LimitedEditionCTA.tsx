import { Button } from "../../components/ui/button";

const timeUnits = [
  { unit: "Days", value: 20 },
  { unit: "Hours", value: 20 },
  { unit: "Minutes", value: 20 },
  { unit: "Seconds", value: 20 },
];

const LimitedEditionCTA = () => {
  return (
    <section className="bg-foreground rounded-md md:rounded-none flex-col items-center flex md:px-16 py-10 md:py-20">
      <div className="flex flex-col items-start gap-6 justify-between md:gap-8 flex-1">
        <span className="text-lg capitalize max-2xl:text-base text-accent">
          Categories
        </span>
        <h2 className="text-background lg:text-6xl md:leading-[70px] max-w-xl">
          Enhance your music experience
        </h2>
        <div className="flex items-center gap-5">
          {timeUnits.map(({ unit, value }) => (
            <div
              key={unit}
              className="flex flex-col bg-background items-center justify-center w-14 h-14 md:w-[80px] md:h-[80px] rounded-full -space-y-2 "
            >
              <span>{value}</span>
              <p className="text-xs md:text-sm">{unit}</p>
            </div>
          ))}
        </div>
        <Button className="bg-green-500 w-full md:w-fit">Buy Now</Button>
      </div>
      <img
        src="/limitededitioncta.webp"
        alt=""
        className="hidden md:block object-contain drop-shadow-[0_0_100px_rgba(255,255,255,0.5)] w-auto h-12 md:h-72"
      />
    </section>
  );
};

export default LimitedEditionCTA;