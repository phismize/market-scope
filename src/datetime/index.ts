import moment from "moment-timezone";

/**
 * 一日の時間帯を表す列挙体
 */
export enum TimePeriod {
  /** 早朝 (5時から8時まで) */
  EarlyMorning = "EarlyMorning",

  /** 午前中 (8時から11時まで) */
  MidMorning = "MidMorning",

  /** 昼前から昼下がり (11時から14時まで) */
  LateMorningEarlyAfternoon = "LateMorningEarlyAfternoon",

  /** 昼下がり (14時から17時まで) */
  MidAfternoon = "MidAfternoon",

  /** 夕方から初夜 (17時から20時まで) */
  LateAfternoonEarlyEvening = "LateAfternoonEarlyEvening",

  /** 夜 (20時から23時まで) */
  Evening = "Evening",

  /** 深夜初期 (23時から2時まで) */
  EarlyNight = "EarlyNight",

  /** 深夜後期 (2時から5時まで) */
  LateNight = "LateNight",
}

/**
 * 時間（24時間表記）を受け取り、それに対応する時間帯を返します。
 * 時間は深夜を超える26時などの表現にも対応します。
 *
 * @param hours - 時間 (24時間表記)
 * @returns 時間帯
 */
export const timePeriodFromHours = (hours: number): TimePeriod => {
  const adjustedHours = hours % 24;

  if (adjustedHours >= 5 && adjustedHours < 8) {
    return TimePeriod.EarlyMorning;
  } else if (adjustedHours >= 8 && adjustedHours < 11) {
    return TimePeriod.MidMorning;
  } else if (adjustedHours >= 11 && adjustedHours < 14) {
    return TimePeriod.LateMorningEarlyAfternoon;
  } else if (adjustedHours >= 14 && adjustedHours < 17) {
    return TimePeriod.MidAfternoon;
  } else if (adjustedHours >= 17 && adjustedHours < 20) {
    return TimePeriod.LateAfternoonEarlyEvening;
  } else if (adjustedHours >= 20 && adjustedHours < 23) {
    return TimePeriod.Evening;
  } else if (adjustedHours >= 23 || adjustedHours < 2) {
    return TimePeriod.EarlyNight;
  } else {
    return TimePeriod.LateNight;
  }
};

export const nextTimePeriod = (currentPeriod: TimePeriod): TimePeriod => {
  switch (currentPeriod) {
    case TimePeriod.EarlyMorning:
      return TimePeriod.MidMorning;
    case TimePeriod.MidMorning:
      return TimePeriod.LateMorningEarlyAfternoon;
    case TimePeriod.LateMorningEarlyAfternoon:
      return TimePeriod.MidAfternoon;
    case TimePeriod.MidAfternoon:
      return TimePeriod.LateAfternoonEarlyEvening;
    case TimePeriod.LateAfternoonEarlyEvening:
      return TimePeriod.Evening;
    case TimePeriod.Evening:
      return TimePeriod.EarlyNight;
    case TimePeriod.EarlyNight:
      return TimePeriod.LateNight;
    case TimePeriod.LateNight:
      return TimePeriod.EarlyMorning;
    default:
      throw new Error("Invalid time period");
  }
};

export const hoursFromTimeZone = (timeZone: string) => {
  try {
    new Date().toLocaleString("en-US", { timeZone });
  } catch (e) {
    console.log(e);
    throw e;
  }

  const hours = Number(
    new Date().toLocaleString("en-US", {
      timeZone,
      hour: "2-digit",
      hour12: false,
    })
  );
  return hours;
};

export const allTimeZone = () => {
  // タイムゾーン名の配列を取得
  const timeZoneNames = moment.tz.names();

  // 各タイムゾーンの詳細情報を取得
  return timeZoneNames.map((timeZoneName) => {
    const now = moment.tz(timeZoneName);

    return {
      name: timeZoneName,
      gmtOffset: now.format("Z"),
      isDST: now.isDST(),
      abbreviation: now.zoneAbbr(),
    };
  });
};
