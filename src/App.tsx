import { Loader } from "./components/Loader";
import { ContainerWrapper } from "./components/ContainerWrapper.tsx";
import { HourCard } from "./components/HourCard.tsx";
import { DayCard } from "./components/DayCard.tsx";
import { ErrorMessage } from "./components/ErrorMessage.tsx";
import { Header } from "./components/Header.tsx";
import { useOnClickOutside } from "./hooks/useOnClickOutside.ts";
import { Footer } from "./components/Footer.tsx";
import { CityTabs } from "./components/CityTabs.tsx";
import { useWeatherData } from "./hooks/useWeatherData.ts";
import { useCitySearch } from "./hooks/useCitySearch.ts";
import { useCityTabs } from "./hooks/useCityTabs.ts";

const initialTabs = [
  { id: "3451190", name: "Rio de Janeiro", countryName: "Brazil" },
  { id: "1816670", name: "Beijing", countryName: "China" },
  { id: "5368361", name: "Los Angeles", countryName: "United States" },
];

function App() {
  const { clearSearch, handleSearchedQuery, searchQuery, resultSearch } =
    useCitySearch();

  const selectRef = useOnClickOutside<HTMLDivElement>(() => {
    clearSearch();
  });

  const {
    tabsOptions,
    selectedTab,
    selectedCity,
    handleSelectedCityTab,
    addCity,
    removeCity,
  } = useCityTabs(initialTabs);

  const {
    error,
    isLoading,
    isFetching,
    hourlyData,
    fiveDayForecast,
    timeZoneOffset,
    lastUpdated,
    handleRefresh,
  } = useWeatherData(selectedCity);

  const handleSelectedSearchedCity = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const cityId = e.currentTarget.dataset.id;
    const citySelection = resultSearch.find((city) => city.city_id === cityId);
    if (citySelection) {
      const newAddedCity = {
        id: citySelection.city_id,
        name: citySelection.city_name,
        countryName: citySelection.country_full,
      };
      addCity(newAddedCity);
      clearSearch();
    }
  };

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <main className="max-w-[800px] m-auto md:max-w-screen lg:min-h-screen lg:flex lg:flex-col">
      <Header
        handleOnRefresh={handleRefresh}
        selectRef={selectRef}
        isFetching={isFetching}
        inputValue={searchQuery}
        inputOnChange={handleSearchedQuery}
        resultSearch={resultSearch}
        searchQuery={searchQuery}
        handleSelectedSearchedCity={handleSelectedSearchedCity}
      />
      <section className="lg:flex-1 lg:flex lg:flex-col">
        <CityTabs
          tabsOptions={tabsOptions}
          selectedTab={selectedTab}
          handleSelectedCityTab={handleSelectedCityTab}
          handleRemoveCity={removeCity}
        />
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
                  timezone={timeZoneOffset || 0}
                />
              ))}
            </div>
          </ContainerWrapper>
          <ContainerWrapper
            title="Next 6 days"
            className="min-h-[535px] max-w-[400px] h-auto lg:max-w-[500px] mx-auto lg:w-[40%] xl:w-[30%]"
          >
            <div className="px-4">
              {fiveDayForecast?.map((day, index) => (
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
      <Footer lastUpdated={lastUpdated} />
    </main>
  );
}

export default App;
