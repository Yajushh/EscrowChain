import axios from "axios";
import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";

interface SearchQueryProps {
  onSelect: (user: User) => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  balance: number;
  createdAt: string;
}

interface AxiosResponse {
  message: string;
  users: User[];
}

export default function SearchQuery({ onSelect }: SearchQueryProps) {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<AxiosResponse>(
          "http://localhost:4000/api/user"
        );
        if (res.status === 200) setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const fuse = new Fuse(users, { keys: ["name"], threshold: 0.3 });

  const results = useMemo(() => {
    if (!query) return users;
    return fuse.search(query).map((result) => result.item);
  }, [query, users]);

  const handleSelect = (name: string) => {
    setQuery(name);
    setShowDropdown(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        placeholder="Search by name"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (results.length > 0) {
              setQuery(results[0].name);
              setShowDropdown(false);
            }
          }
        }}
      />

      {showDropdown && results.length > 0 && (
        <ul className="absolute mt-1 w-full z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.map((user) => (
            <li
              key={user.id}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-indigo-50 dark:hover:bg-indigo-600 cursor-pointer transition"
              onClick={() => {
                handleSelect(user.name);
                onSelect(user);
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && query && results.length === 0 && (
        <ul className="absolute mt-1 w-full z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <li className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
            No matches found.
          </li>
        </ul>
      )}
    </div>
  );
}
