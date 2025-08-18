type DayCardProps = {
  icon: string;
  alt: string;
  date: string;
  description: string;
  min_temp: number;
  max_temp: number;
};

export const DayCard = ({
  icon,
  alt,
  date,
  description,
  min_temp,
  max_temp,
}: DayCardProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={alt}
        width={60}
        height={60}
      />
      <div className="text-center">
        <p className="text-[17px]">
          {new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
        <p className="text-gray-700 text-[14px]">
          {description.charAt(0).toUpperCase() + description.slice(1)}
        </p>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-xl font-medium">{max_temp}°</p>{" "}
        <p className="text-gray-600 font-medium">{min_temp}°</p>
      </div>
    </div>
  );
};
