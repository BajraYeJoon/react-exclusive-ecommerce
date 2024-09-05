import { Fragment } from "react";

const timer = [
  {
    unit: "Days",
    value: "02",
  },
  {
    unit: "Hours",
    value: "01",
  },
  {
    unit: "Minutes",
    value: "23",
  },
  {
    unit: "Seconds",
    value: "45",
  },
];

function FlashSaleTimer() {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {timer.map((time, index) => (
        <Fragment key={index}>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground md:text-sm">
              {time.unit}
            </span>
            <span className="text-sm font-bold text-foreground md:text-3xl">
              {time.value}
            </span>
          </div>
          {index !== timer.length - 1 && (
            <span className="text-base text-primary md:text-4xl">:</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default FlashSaleTimer;
