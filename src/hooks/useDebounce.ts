import { useEffect, useState } from "react";

export const useDebounce = (query: string) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
      setSearchTerm(query);
    }, 500);

    return () => clearInterval(timeId);
  }, [query]);

  return { searchTerm };
};
