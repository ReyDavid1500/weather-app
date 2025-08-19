import { useCallback, useState } from "react";
import cities from "../mockData/cities";
import type { TCity } from "../types";

export const useCitySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultSearch, setResultSearch] = useState<TCity[]>([]);

  const handleSearchedQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    []
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setResultSearch([]);
  }, []);

  return { searchQuery, resultSearch, handleSearchedQuery, clearSearch };
};
