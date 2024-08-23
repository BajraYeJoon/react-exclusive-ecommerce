import { useCountdown } from "./useCountdown";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const DateTimeDisplay = ({
  value,
  type,
}: {
  value: number | string;
  type: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-foreground md:text-base">
        {value}
      </span>
      <span className="text-xs font-bold text-foreground md:text-sm">
        {type}
      </span>
    </div>
  );
};

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  const daysString = days.toString(); // Convert days to a string
  return (
    <div className="flex items-center gap-2">
      <DateTimeDisplay value={daysString} type={"Days"} />
      <span className="text-base text-primary md:text-4xl">:</span>
      <DateTimeDisplay value={hours} type={"Hours"} />
      <span className="text-base text-primary md:text-4xl">:</span>
      <DateTimeDisplay value={minutes} type={"Mins"} />
      <span className="text-base text-primary md:text-4xl">:</span>
      <DateTimeDisplay value={seconds} type={"Seconds"} />
    </div>
  );
};

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate.toString());

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
