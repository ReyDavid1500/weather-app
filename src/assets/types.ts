export type TApiResponse = {
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
