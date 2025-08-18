import type React from "react";
import type { TCity } from "../types";
import { RefreshIcon } from "./Icons/RefreshIcon";
import { Tooltip } from "./Tooltip";
import { SearchDropdown } from "./SearchDropdown";

type HeaderProps = {
  handleOnRefresh: () => void;
  selectRef: React.RefObject<HTMLDivElement | null>;
  isFetching: boolean;
  inputValue: string;
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resultSearch: TCity[];
  searchQuery: string;
  handleSelectedSearchedCity: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Header = ({
  handleOnRefresh,
  isFetching,
  inputValue,
  inputOnChange,
  resultSearch,
  searchQuery,
  handleSelectedSearchedCity,
  selectRef,
}: HeaderProps) => {
  return (
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
                onClick={handleOnRefresh}
                aria-label="Refresh weather data"
              >
                <RefreshIcon
                  width={20}
                  height={20}
                  className={`transition-transform duration-300 cursor-pointer ${
                    isFetching ? "animate-spin" : ""
                  }`}
                />
              </button>
            </Tooltip>
          </div>
          <SearchDropdown
            selectRef={selectRef}
            inputValue={inputValue}
            inputOnChange={inputOnChange}
            resultSearch={resultSearch}
            searchQuery={searchQuery}
            handleSelectedSearchedCity={handleSelectedSearchedCity}
          />
        </div>
      </div>
    </header>
  );
};
