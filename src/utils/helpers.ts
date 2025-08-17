import type { TApiResponse, TDailyForecast } from "../assets/types";

export const get5DayForecast = (data: TApiResponse[]) => {
  const newData = data?.reduce<Record<string, TDailyForecast>>((acc, curr) => {
    const date = new Date(curr.dt * 1000).toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = {
        min_temp: Math.floor(curr.main.temp_min),
        max_temp: Math.round(curr.main.temp_max),
        date: date,
        timestamp: curr.dt * 1000,
        weather: curr.weather[0].description,
        icon: curr.weather[0].icon,
      };
    } else {
      acc[date].min_temp = Math.min(
        acc[date].min_temp,
        Math.floor(curr.main.temp_min)
      );
      acc[date].max_temp = Math.max(
        acc[date].max_temp,
        Math.round(curr.main.temp_max)
      );
    }
    return acc;
  }, {});

  return Object.values(newData || {});
};
