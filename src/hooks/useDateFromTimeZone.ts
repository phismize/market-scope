import { useState, useEffect } from "react";

export const useDateFromTimeZone = (timeZone: string) => {
  const calculateTime = () => {
    let effectiveTimeZone = timeZone;
    try {
      new Date().toLocaleString("en-US", { timeZone: timeZone });
    } catch (e) {
      return undefined;
    }

    const now = new Date();
    const date = new Date(
      now.toLocaleString("en-US", { timeZone: effectiveTimeZone })
    );
    return date;
  };

  const [date, setDate] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(calculateTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeZone]);

  return date;
};
