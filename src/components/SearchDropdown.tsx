import React from "react";
import type { TCity } from "../types";
import { SearchIcon } from "./Icons/SearchIcon";

type SearchDropdownProps = {
  selectRef: React.RefObject<HTMLDivElement | null>;
  inputValue: string;
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resultSearch: TCity[];
  handleSelectedSearchedCity: (e: React.MouseEvent<HTMLButtonElement>) => void;
  searchQuery: string;
};

export const SearchDropdown = ({
  selectRef,
  inputValue,
  inputOnChange,
  resultSearch,
  handleSelectedSearchedCity,
  searchQuery,
}: SearchDropdownProps) => {
  return (
    <div className="relative md:w-auto" ref={selectRef}>
      <input
        id="search-input"
        name="search-input"
        type="text"
        placeholder="Search city"
        className="p-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 w-[300px] lg:w-[400px]"
        value={inputValue}
        onChange={inputOnChange}
      />
      <SearchIcon
        width={20}
        height={20}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
      {resultSearch.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-xl mt-2 max-h-60 overflow-y-auto border border-gray-200 z-30 backdrop-blur-sm">
          <div className="py-2">
            {resultSearch.map((city, index) => (
              <button
                key={city.city_id}
                data-id={city.city_id}
                className={`w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-3 ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${index === resultSearch.length - 1 ? "rounded-b-xl" : ""}`}
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
      {searchQuery.length > 3 && resultSearch.length === 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-xl mt-2 border border-gray-200 z-30">
          <div className="p-4 text-gray-500 text-center flex items-center justify-center gap-2">
            <span>🔍</span>
            <span>No cities found</span>
          </div>
        </div>
      )}
    </div>
  );
};
