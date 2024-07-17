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
    <div className="flex justify-center items-center gap-2 md:gap-4">
      {timer.map((time, index) => (
        <>
          <div className="flex flex-col gap-2" key={index}>
            <span className="text-xs md:text-sm font-medium text-foreground">
              {time.unit}
            </span>
            <span className="text-sm md:text-3xl font-bold text-foreground">
              {time.value}
            </span>
          </div>
          {index !== timer.length - 1 && (
            <span className=" text-base md:text-4xl text-primary">:</span>
          )}
        </>
      ))}
    </div>
  );
}

export default FlashSaleTimer;
