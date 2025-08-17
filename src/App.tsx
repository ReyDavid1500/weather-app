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

const initialTabs = [
  { id: "3451190", name: "RIO DE JANEIRO" },
  { id: "1816670", name: "BEIJING" },
  { id: "5368361", name: "LOS ANGELES" },
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
    return <div className="text-center text-red-500">Error loading data</div>;
  }

  return (
    <main className="max-w-[800px] m-auto md:max-w-screen lg:min-h-screen lg:flex lg:flex-col">
      <header className="flex items-center justify-between p-4 bg-blue-500 text-white lg:px-20">
        <div className="flex items-center gap-1">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Simple Weather
          </h1>
          <div className="relative group">
            <img
              src={refresh}
              alt="Refresh"
              width={25}
              height={25}
              className="cursor-pointer"
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
            />
            <div className="absolute top-[125%] left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-blue-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Refresh data
            </div>
          </div>
        </div>
        <div className="relative">
          <SearchInput value={searchQuery} onChange={handleSearchedQuery} />
          {resultSearch.length > 0 && (
            <div
              ref={selectRef}
              className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto border border-gray-200"
            >
              {resultSearch.map((city) => (
                <button
                  key={city.city_id}
                  data-id={city.city_id}
                  className="w-full text-left p-2 text-black hover:bg-gray-100 cursor-pointer"
                  onClick={handleSelectedSearchedCity}
                >
                  {city.city_name}, {city.country_full}
                </button>
              ))}
            </div>
          )}
          {searchTerm.length > 3 && resultSearch.length === 0 && (
            <div
              ref={selectRef}
              className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto border border-gray-200"
            >
              <div className="p-2 text-gray-500 text-center">
                No cities found
              </div>
            </div>
          )}
        </div>
      </header>
      <section className="lg:flex-1 lg:flex lg:flex-col">
        {(isLoading || isFetching) && <Loader />}
        <div className="flex flex-wrap justify-center min-h-[60px] h-auto">
          {tabsOptions.map((city) => (
            <button
              key={city.id}
              data-id={city.id}
              className={`w-[135px] lg:w-[150px] p-2 font-medium text-[14px] cursor-pointer uppercase ${
                selectedTab.id === city.id
                  ? "text-black border-b-2 border-red-500"
                  : "text-gray-500"
              }`}
              onClick={handleSelectedCityTab}
            >
              {city.name}
            </button>
          ))}
        </div>
        <div className="bg-[url(https://pub-873e7884cc3b416fa7c9d881d5d16822.r2.dev/noaa-99F4mC79j1I-unsplash.jpg)] py-2 px-5 lg:flex lg:flex-1 lg:items-center">
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
      <footer className="bg-blue-500 text-white text-right text-[14px] p-1 lg:text-xl">
        <p>Last updated on {lastUpdated}</p>
      </footer>
    </main>
  );
}

export default App;
