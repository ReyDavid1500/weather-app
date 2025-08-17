import { useState } from "react";
import refresh from "./assets/icons/refresh.svg";
import { useDebounce } from "./hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiKey } from "./assets/constants";
import type { TApiResponse, TCity, TDailyForecast } from "./assets/types";
import useOnClickOutside from "./hooks/useOnClickOutside";
import { Loader } from "./components/Loader";
import cities from "./assets/cities.ts";
import { get5DayForecast } from "./utils/helpers.ts";
import { ContainerWrapper } from "./components/ContainerWrapper.tsx";
import { HourCard } from "./components/HourCard.tsx";
import { DayCard } from "./components/DayCard.tsx";
import { SearchInput } from "./components/SearchInput.tsx";
import { ErrorMessage } from "./components/ErrorMessage.tsx";
import { Tooltip } from "./components/Tooltip.tsx";

const initialTabs = [
  { id: "3451190", name: "Rio de Janeiro" },
  { id: "1816670", name: "Beijing" },
  { id: "5368361", name: "Los Angeles" },
];

function App() {
  const [tabsOptions, setTabsOptions] = useState(initialTabs);
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);
  const [selectedCity, setSelectedCity] = useState<TCity>(
    cities.find((city) => city.city_id === selectedTab.id) as TCity
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [resultSearch, setResultSearch] = useState<TCity[]>([]);
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const { searchTerm } = useDebounce(searchQuery);

  const selectRef = useOnClickOutside<HTMLDivElement>(() => {
    setSearchQuery("");
  });

  const {
    data: { hourlyData, fiveDayForecast } = {},
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cityWeather", selectedCity.city_id],
    queryFn: async (): Promise<{
      hourlyData: TApiResponse[];
      fiveDayForecast: TDailyForecast[];
    }> => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            lat: selectedCity.lat,
            lon: selectedCity.lon,
            appid: apiKey,
            units: "metric",
          },
        }
      );
      const fiveDayForecast = get5DayForecast(response.data.list);
      return { hourlyData: response.data.list, fiveDayForecast };
    },
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(selectedCity),
    refetchOnWindowFocus: false,
  });

  const handleSearchedQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length < 3) {
      setResultSearch([]);
      return;
    }
    const filteredCities = cities.filter((city) =>
      city.city_name.toLowerCase().includes(value.toLowerCase().trimEnd())
    );
    setResultSearch(filteredCities);
  };

  const handleSelectedCityTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const cityId = e.currentTarget.dataset.id;
    const citySelection = tabsOptions.find((city) => city.id === cityId);
    if (citySelection) {
      setSelectedTab(citySelection);
      setSelectedCity(
        cities.find((city) => city.city_id === citySelection.id) as TCity
      );
    }
  };

  const handleSelectedSearchedCity = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const cityId = e.currentTarget.dataset.id;
    const citySelection = resultSearch.find((city) => city.city_id === cityId);
    if (citySelection) {
      const addedCity = {
        id: citySelection.city_id,
        name: citySelection.city_name,
      };
      setTabsOptions((prev) => {
        if (prev.some((city) => city.id === addedCity.id)) {
          return prev;
        }
        return [...prev, addedCity];
      });
      setSelectedCity(citySelection);
      setSelectedTab(addedCity);
      setResultSearch([]);
      setSearchQuery("");
    }
  };

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <main className="max-w-[800px] m-auto md:max-w-screen lg:min-h-screen lg:flex lg:flex-col">
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl border-b border-blue-400/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between py-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌤️</span>
                </div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                  Simple Weather
                </h1>
              </div>
              <Tooltip tooltipText="Refresh data">
                <button
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={() => {
                    refetch();
                    setLastUpdated(
                      new Date().toLocaleTimeString("en-US", {
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    );
                  }}
                  aria-label="Refresh weather data"
                >
                  <img
                    src={refresh}
                    alt="Refresh"
                    width={20}
                    height={20}
                    className={`transition-transform duration-300 ${
                      isFetching ? "animate-spin" : ""
                    }`}
                  />
                </button>
              </Tooltip>
            </div>
            <div className="relative md:w-auto">
              <SearchInput value={searchQuery} onChange={handleSearchedQuery} />
              {resultSearch.length > 0 && (
                <div
                  ref={selectRef}
                  className="absolute top-full left-0 w-full bg-white shadow-xl rounded-xl mt-2 max-h-60 overflow-y-auto border border-gray-200 z-30 backdrop-blur-sm"
                >
                  <div className="py-2">
                    {resultSearch.map((city, index) => (
                      <button
                        key={city.city_id}
                        data-id={city.city_id}
                        className={`w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-3 ${
                          index === 0 ? "rounded-t-xl" : ""
                        } ${
                          index === resultSearch.length - 1
                            ? "rounded-b-xl"
                            : ""
                        }`}
                        onClick={handleSelectedSearchedCity}
                      >
                        <span className="text-blue-500">📍</span>
                        <div>
                          <div className="font-medium">{city.city_name}</div>
                          <div className="text-sm text-gray-500">
                            {city.country_full}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {searchTerm.length > 3 && resultSearch.length === 0 && (
                <div
                  ref={selectRef}
                  className="absolute top-full left-0 w-full bg-white shadow-xl rounded-xl mt-2 border border-gray-200 z-30"
                >
                  <div className="p-4 text-gray-500 text-center flex items-center justify-center gap-2">
                    <span>🔍</span>
                    <span>No cities found</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <section className="lg:flex-1 lg:flex lg:flex-col">
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap justify-center lg:justify-start py-2">
              {tabsOptions.map((city, index) => (
                <button
                  key={city.id}
                  data-id={city.id}
                  className={`relative px-4 py-3 mx-1 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap min-w-[80px] lg:min-w-[140px] ${
                    selectedTab.id === city.id
                      ? "bg-blue-500 text-white shadow-md transform -translate-y-0.5"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                  onClick={handleSelectedCityTab}
                >
                  <span className="relative z-10">{city.name}</span>
                  {selectedTab.id === city.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg"></div>
                  )}
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
                  )}
                </button>
              ))}
              {tabsOptions.length > 3 && (
                <div className="flex items-center px-2 text-xs text-gray-400">
                  <span>+{tabsOptions.length - 3} more</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-[url(https://pub-873e7884cc3b416fa7c9d881d5d16822.r2.dev/noaa-99F4mC79j1I-unsplash.jpg)] py-5 px-5 lg:flex lg:flex-1 lg:items-center relative">
          {(isLoading || isFetching) && <Loader />}
          <ContainerWrapper
            title="Next hours"
            className="lg:w-[50%] xl:w-[60%]"
          >
            <div className="flex overflow-x-auto h-[115px]">
              {hourlyData?.map((hour, index) => (
                <HourCard
                  key={index}
                  temp={hour.main.temp}
                  pop={hour.pop}
                  icon={hour.weather[0].icon}
                  alt={hour.weather[0].description}
                  unixDate={hour.dt}
                />
              ))}
            </div>
          </ContainerWrapper>
          <ContainerWrapper
            title="Next 5 days"
            className="min-h-[535px] max-w-[400px] h-auto lg:max-w-[500px] mx-auto lg:w-[40%] xl:w-[30%]"
          >
            <div className="px-4">
              {fiveDayForecast &&
                fiveDayForecast.map((day, index) => (
                  <DayCard
                    key={index}
                    icon={day.icon}
                    alt={day.weather}
                    date={day.date}
                    description={day.weather}
                    min_temp={day.min_temp}
                    max_temp={day.max_temp}
                  />
                ))}
            </div>
          </ContainerWrapper>
        </div>
      </section>
      <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center text-xs md:text-sm lg:text-base p-3 md:p-4 shadow-lg border-t border-blue-400/30">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
          <p className="flex items-center gap-2 mb-1 md:mb-0">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            Last updated on {lastUpdated}
          </p>
          <p className="text-blue-200 text-xs md:text-sm">
            Data provided by OpenWeatherMap
          </p>
        </div>
      </footer>
    </main>
  );
}

export default App;
