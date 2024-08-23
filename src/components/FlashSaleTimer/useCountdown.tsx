import { useEffect, useState } from "react";

const useCountdown = (targetDate: string) => {
  const countDownDate: number = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState<number>(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getReturnValues = (countDown: number): CountdownValues => {
  const days: number = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes: number = Math.floor(
    (countDown % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds: number = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export { useCountdown };
