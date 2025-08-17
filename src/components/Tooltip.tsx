import type { PropsWithChildren } from "react";

type TooltipProps = {
  tooltipText: string;
  position?: "top" | "bottom";
};

export const Tooltip = ({
  children,
  tooltipText,
  position = "bottom",
}: PropsWithChildren<TooltipProps>) => {
  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute ${
          position === "top" ? "bottom-full" : "top-full"
        } left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20`}
      >
        <span>{tooltipText}</span>
        <div
          className={`absolute ${
            position === "top" ? "-bottom-1" : "-top-1"
          } left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45`}
        ></div>
      </div>
    </div>
  );
};
