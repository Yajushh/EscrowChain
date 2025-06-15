import { useState } from "react";

interface CurrencyListProps {
  onSelect: (currency: string) => void;
}

export default function CurrencyList({ onSelect }: CurrencyListProps) {
  const currency = ["USD", "INR"];
  const [curr, setCurr] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Currency"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        value={curr}
        onChange={() => setShowDropdown(true)}
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && (
        <ul className="absolute mt-1 w-full z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {currency.map((c, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-indigo-50 dark:hover:bg-indigo-600 cursor-pointer transition"
              onClick={() => {
                setShowDropdown(false);
                setCurr(c);
                onSelect(c);
              }}
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
