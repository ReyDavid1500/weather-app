import { useState } from "react";
import type { TCityTabData, TCity } from "../types";
import cities from "../mockData/cities";

export const useCityTabs = (initialTabs: TCityTabData[]) => {
  const [tabsOptions, setTabsOptions] = useState(initialTabs);
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);
  const [selectedCity, setSelectedCity] = useState<TCity>(
    cities.find((city) => city.city_id === selectedTab.id) as TCity
  );

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

  const addCity = (newCity: TCityTabData) => {
    setTabsOptions((prev) => {
      if (prev.some((city) => city.id === newCity.id)) {
        return prev;
      }
      return [...prev, newCity];
    });
    setSelectedTab(newCity);
    setSelectedCity(
      cities.find((city) => city.city_id === newCity.id) as TCity
    );
  };

  const removeCity = (cityId: string) => {
    if (tabsOptions.length <= 1) {
      return;
    }

    const updatedTabs = tabsOptions.filter((city) => city.id !== cityId);
    setTabsOptions(updatedTabs);

    const firstTab = updatedTabs[0];

    const newSelectedCity = cities.find(
      (city) => city.city_id === firstTab.id
    ) as TCity;

    setSelectedTab(firstTab);
    setSelectedCity(newSelectedCity);
  };

  return {
    tabsOptions,
    selectedTab,
    selectedCity,
    addCity,
    removeCity,
    handleSelectedCityTab,
  };
};
