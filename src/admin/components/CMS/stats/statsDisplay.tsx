import { Stat } from "./statsMain";

interface StatsDisplayProps {
  stats: Stat[];
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <section className="flex justify-between gap-12">
      {stats.map(({ description, value }, index) => (
        <div
          className="group flex flex-col items-center gap-9 rounded-md border border-foreground/25 px-9 py-5 hover:bg-primary lg:px-12"
          key={index}
        >
          <div className="space-y-3 text-center">
            <p className="__className_39e0cc group-hover:text-color-text-1 max-3xl:text-3xl text-4xl transition-colors duration-300 ease-in-out max-2xl:text-xl">
              {value}
            </p>
            <p className="group-hover:text-color-text-1 text-lg transition-colors duration-300 ease-in-out max-2xl:text-base">
              {description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
