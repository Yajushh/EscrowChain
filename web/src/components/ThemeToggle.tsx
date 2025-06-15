import { useThemeStore } from "../store/themeStore";

export default function ThemeToggle() {
  const { dark, toggleDark } = useThemeStore();

  return (
    <button
      onClick={toggleDark}
      className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
