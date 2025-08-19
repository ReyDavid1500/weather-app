import { useQuery } from "@tanstack/react-query";
import type {
  TApiHourlyData,
  TApiResponse,
  TCity,
  TDailyForecast,
} from "../types";
import axios from "axios";
import { API_KEY, URL } from "../utils/constants";
import { getDaysForecast } from "../utils/helpers";
import { useState } from "react";

export const useWeatherData = (selectedCity: TCity) => {
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const {
    data: { hourlyData, fiveDayForecast, timeZoneOffset } = {
      hourlyData: [],
      fiveDayForecast: [],
      timeZoneOffset: 0,
    },
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cityWeather", selectedCity.city_id],
    queryFn: async (): Promise<{
      hourlyData: TApiHourlyData[];
      fiveDayForecast: TDailyForecast[];
      timeZoneOffset: number;
    }> => {
      const response = await axios.get<TApiResponse>(URL, {
        params: {
          lat: selectedCity.lat,
          lon: selectedCity.lon,
          appid: API_KEY,
          units: "metric",
        },
      });
      const timeZoneOffset = response.data.city.timezone;
      const fiveDayForecast = getDaysForecast(response.data.list);
      return {
        hourlyData: response.data.list,
        fiveDayForecast,
        timeZoneOffset,
      };
    },
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(selectedCity),
    refetchOnWindowFocus: false,
  });

  const handleRefresh = () => {
    refetch();
    setLastUpdated(
      new Date().toLocaleTimeString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  return {
    hourlyData,
    fiveDayForecast,
    timeZoneOffset,
    isLoading,
    isFetching,
    error,
    lastUpdated,
    handleRefresh,
  };
};
