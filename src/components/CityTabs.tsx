import React from "react";
import type { TCityTabData } from "../types";
import { Tooltip } from "./Tooltip";
import { DeleteIcon } from "./Icons/DeleteIcon";

type CityTabsProps = {
  tabsOptions: TCityTabData[];
  selectedTab: TCityTabData;
  handleSelectedCityTab: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveCity: (cityId: string) => void;
};

export const CityTabs = ({
  tabsOptions,
  selectedTab,
  handleSelectedCityTab,
  handleRemoveCity,
}: CityTabsProps) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center lg:justify-start py-2">
          {tabsOptions.map((city) => (
            <div key={city.id} className="relative">
              <button
                data-id={city.id}
                className={`flex flex-col relative px-4 py-3 mx-1 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap min-w-[80px] lg:min-w-[140px] cursor-pointer ${
                  selectedTab.id === city.id
                    ? "bg-blue-500 text-white shadow-md transform -translate-y-0.5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                }`}
                onClick={handleSelectedCityTab}
              >
                <span className="relative z-10">{city.name}</span>
                <span className="text-[10px] font-light z-10">
                  {city.countryName}
                </span>
                {selectedTab.id === city.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg"></div>
                )}
              </button>
              {tabsOptions.length > 3 && (
                <div className="absolute -top-0 right-2 z-10">
                  <Tooltip tooltipText="Remove city" position="top">
                    <span
                      key={city.id}
                      className={`text-gray-600 hover:text-gray-900 cursor-pointer  text-xs`}
                      onClick={() => handleRemoveCity(city.id)}
                    >
                      <DeleteIcon width={16} height={16} />
                    </span>
                  </Tooltip>
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center absolute right-2 top-2 space-x-2"></div>
          {tabsOptions.length > 3 && (
            <div className="flex items-center px-2 text-xs text-gray-400">
              <span>+{tabsOptions.length - 3} more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
