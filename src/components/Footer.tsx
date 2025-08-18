export const Footer = ({ lastUpdated }: { lastUpdated: string }) => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center text-xs md:text-sm lg:text-base p-3 md:p-4 shadow-lg border-t border-blue-400/30">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
        <p className="flex items-center gap-2 mb-1 md:mb-0">
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          Last updated on {lastUpdated}
        </p>
        <p className="text-blue-200 text-xs md:text-sm">
          Data provided by OpenWeatherMap
        </p>
      </div>
    </footer>
  );
};
