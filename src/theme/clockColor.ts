import { TimePeriod } from "../datetime";

export const clockColorByPeriod = (period: TimePeriod) => {
  switch (period) {
    case TimePeriod.EarlyMorning:
      return "#A0D8EF"; // early morning
    case TimePeriod.MidMorning:
      return "#fffacd"; // mid morning
    case TimePeriod.LateMorningEarlyAfternoon:
      return "#ffd700"; // late morning/early afternoon
    case TimePeriod.MidAfternoon:
      return "#f4a460"; // mid afternoon
    case TimePeriod.LateAfternoonEarlyEvening:
      return "#b22222"; // late afternoon/early evening
    case TimePeriod.Evening:
      return "#4169E1"; // evening
    case TimePeriod.EarlyNight:
      return "#000080"; // early night
    case TimePeriod.LateNight:
      return "#2F4F4F"; // late night
  }
};
