import { Button } from "../../components/ui/button";

const timeUnits = [
  { unit: "Days", value: 20 },
  { unit: "Hours", value: 20 },
  { unit: "Minutes", value: 20 },
  { unit: "Seconds", value: 20 },
];

const LimitedEditionCTA = () => {
  return (
    <section className="bg-foreground items-center flex px-16 py-20">
      <div className="flex flex-col items-start justify-between gap-8 flex-1">
        <span className="text-lg capitalize max-2xl:text-base text-accent">
          Categories
        </span>
        <h2 className="text-background lg:text-6xl leading-[70px] max-w-xl">
          Enhance your music experience
        </h2>
        <div className="flex items-center gap-5">
          {timeUnits.map(({ unit, value }) => (
            <div
              key={unit}
              className="flex flex-col bg-background items-center justify-center w-[80px] h-[80px] rounded-full -space-y-2 max-2xl:w-[75px] max-2xl:h-[75px]"
            >
              <span>{value}</span>
              <p>{unit}</p>
            </div>
          ))}
        </div>
        <Button className="bg-green-500">Buy Now</Button>
      </div>
      <img
        src="/limitededitioncta.webp"
        alt=""
        className="object-contain drop-shadow-[0_0_100px_rgba(255,255,255,0.5)] w-auto h-72"
      />
    </section>
  );
};

export default LimitedEditionCTA;