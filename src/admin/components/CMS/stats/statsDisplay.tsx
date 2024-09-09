import { Stat } from "./statsMain";

interface StatsDisplayProps {
  stats: Stat[];
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <section className="flex flex-wrap justify-start gap-4">
      {stats.map(({ description, value }, index) => (
        <div
          className="flex flex-col items-center gap-9 rounded-md border border-foreground/25 px-9 py-5 lg:px-6"
          key={index}
        >
          <div className="space-y-3 text-center">
            <p className="text-sm font-medium md:text-base lg:text-xl">
              {value}
            </p>
            <p className="text-xs md:text-sm lg:text-base">{description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
