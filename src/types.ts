export type CityTabData = {
  id: string;
  name: string;
  countryName: string;
};

export type TApiResponse = {
  list: TApiHourlyData[];
  city: TApiCityData;
};

export type TApiHourlyData = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export type TApiCityData = {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type TCity = {
  city_id: string;
  city_name: string;
  state_code: string;
  country_code: string;
  country_full: string;
  lat: number;
  lon: number;
};

export type TDailyForecast = {
  min_temp: number;
  max_temp: number;
  date: string;
  timestamp: number;
  weather: string;
  icon: string;
};
