type HourCardProps = {
  temp: number;
  pop: number;
  icon: string;
  alt: string;
  unixDate: number;
  timezone: number; // Timezone offset in seconds
};

export const HourCard = ({
  temp,
  pop,
  icon,
  alt,
  unixDate,
  timezone,
}: HourCardProps) => {
  const localTime = new Date((unixDate + timezone) * 1000);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(localTime);

  return (
    <div className="flex flex-col items-center justify-between w-[120px] px-4 text-[14px]">
      <div>
        <span>{Math.floor(temp)}°</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="border-r border-gray-200 px-6 text-center">
          <span className="text-emerald-600">{Math.floor(pop * 100)}%</span>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={alt}
            className="max-w-[40px] max-h-[40px]"
          />
        </div>
        <p className="text-gray-700">{formattedTime}</p>
      </div>
    </div>
  );
};
