import search from "../assets/icons/search.svg";

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search city"
        className="p-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 w-[180px] md:w-[300px] lg:w-[400px]"
        value={value}
        onChange={onChange}
      />
      <img
        src={search}
        alt="Search"
        width={20}
        height={20}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
    </>
  );
};
