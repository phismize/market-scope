import React, { useEffect, useState } from "react";
import {
  TiWeatherNight,
  TiWeatherSunny,
  TiWeatherPartlySunny,
} from "react-icons/ti";
import { Box, Typography } from "@mui/material";
import { TimePeriod, nextTimePeriod, timePeriodFromHours } from "../datetime";
import { clockColorByPeriod } from "../theme/clockColor";

type ClockProps = {
  date: Date;
  timeZoneName: string;
  theme?: {
    clockLineColor?: string;
    secondHandColor?: string;
  };
  size: string | number;
};

export const iconFromTimePeriod = (timePeriod: TimePeriod) => {
  const size = 50;
  const color = "black";
  switch (timePeriod) {
    case TimePeriod.LateNight:
    case TimePeriod.EarlyMorning:
      return <TiWeatherPartlySunny size={size} color={color} />;
    case TimePeriod.MidMorning:
    case TimePeriod.LateMorningEarlyAfternoon:
      return <TiWeatherSunny size={size} color={color} />;
    case TimePeriod.MidAfternoon:
    case TimePeriod.LateAfternoonEarlyEvening:
      return (
        <TiWeatherPartlySunny
          size={50}
          color={"black"}
          style={{
            transform: "scaleX(-1)",
          }}
        />
      );
    case TimePeriod.Evening:
    case TimePeriod.EarlyNight:
      return <TiWeatherNight size={size} color={color} />;
    default:
      throw new Error("Invalid time period");
  }
};

// 数値と桁数の数値を受け取ったら、桁数分0埋めした文字列を返す
const zeroPadding = (num: number, length: number) => {
  return ("0000000000" + num).slice(-length);
};

// dateを受け取ったら、曜日の文字列を返す
const getDayOfWeek = (date: Date) => {
  // 英語表記
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return dayOfWeek[date.getDay()];
};

const Clock: React.FC<ClockProps> = ({
  date,
  theme,
  size,
  timeZoneName,
}: ClockProps) => {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  const secondHandRotation = seconds * 6;
  const minuteHandRotation = minutes * 6 + seconds * 0.1;
  const hourHandRotation = hours * 30 + minutes * 0.5;

  const timePeriod1 = timePeriodFromHours(hours);
  const timePeriod2 = nextTimePeriod(timePeriod1);
  const color1 = clockColorByPeriod(timePeriod1);
  const color2 = clockColorByPeriod(timePeriod2);
  const gradientId: string = timePeriod1;
  const periodIcon = iconFromTimePeriod(timePeriod1);
  const svgSize = typeof size === "number" ? `calc(${size} * 0.5)` : size;
  return (
    <Box
      mt={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box>{periodIcon}</Box>
      <svg
        viewBox="0 0 200 200"
        width={"50%"}
        height={"50%"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke={theme?.clockLineColor ?? "black"}
          fill={`url(#${gradientId})`}
          strokeWidth="10"
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          stroke={theme?.secondHandColor ?? "white"}
          strokeWidth="2"
          transform={`rotate(${secondHandRotation},100,100)`}
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="40"
          stroke={theme?.clockLineColor ?? "black"}
          strokeWidth="4"
          transform={`rotate(${minuteHandRotation},100,100)`}
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="60"
          stroke={theme?.clockLineColor ?? "black"}
          strokeWidth="6"
          transform={`rotate(${hourHandRotation},100,100)`}
        />
      </svg>
      <Typography mt={1} style={{ fontFamily: "Helvetica" }}>
        {timeZoneName}
      </Typography>
      <Typography fontFamily="Helvetica">
        {date.getMonth() + 1}/{date.getDay()}/{date.getFullYear()}{" "}
        {`(${getDayOfWeek(date)})`}
      </Typography>
      <Typography variant="h6" fontFamily="Helvetica">
        {zeroPadding(date.getHours(), 2)}:{zeroPadding(date.getMinutes(), 2)}
      </Typography>
    </Box>
  );
};

export default Clock;
