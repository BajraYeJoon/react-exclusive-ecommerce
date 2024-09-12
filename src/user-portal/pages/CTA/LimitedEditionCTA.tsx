import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../common/ui/button";
import { fetchSalesProduct } from "../../../common/api/productApi";
import { ExpiredNotice } from "../../components/flashSaleTimer/counttimer";
import { useCountdown } from "../../components/flashSaleTimer/useCountdown";
import { Link } from "react-router-dom";

const LimitedEditionCTA = () => {
  const { data: salesData } = useQuery({
    queryKey: ["sale"],
    queryFn: fetchSalesProduct,
  });

  const dateConversion = new Date(salesData ? salesData[0]?.saleEnd : 400000);

  const CUSTOM_DAYS_IN_MS = dateConversion.getTime();

  return (
    <section className="flex flex-col items-center rounded-md bg-foreground py-10 md:flex-row md:rounded-none md:px-10 md:py-20 lg:px-16">
      <div className="flex flex-1 flex-col items-start justify-between gap-6 md:gap-8">
        <span className="text-lg capitalize text-accent max-2xl:text-base">
          Categories
        </span>
        <h2 className="max-w-xl text-background md:leading-[70px] lg:text-6xl">
          Enhance your music experience
        </h2>

        <LimitedCounter targetDate={new Date(CUSTOM_DAYS_IN_MS)} />
        <Link className="md:w-fit" to={"/products/5"}>
          <Button className="w-full bg-green-500">Buy Now</Button>
        </Link>
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

const TimeUnit = ({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) => (
  <div className="flex h-14 w-14 flex-col items-center justify-center -space-y-1 rounded-full bg-background p-2 md:h-14 md:w-14 lg:h-[80px] lg:w-[80px]">
    <span className="font-bold">{value}</span>
    <span className="text-xs font-medium lg:text-sm">{label}</span>
  </div>
);

const LimitedCounter = ({ targetDate }: { targetDate: Date }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate.toString());

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <div className="flex items-center gap-5 p-1">
        <TimeUnit value={days} label="Days" />
        <TimeUnit value={hours} label="Hours" />
        <TimeUnit value={minutes} label="Minutes" />
        <TimeUnit value={seconds} label="Seconds" />
      </div>
    );
  }
};
