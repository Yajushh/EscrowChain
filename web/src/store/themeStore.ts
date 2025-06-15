import { create } from "zustand";

interface ThemeState {
  dark: boolean;
  toggleDark: () => void;
}

const saved = localStorage.getItem("theme") === "dark";
const html = document.documentElement;
if (saved) html.classList.add("dark");

export const useThemeStore = create<ThemeState>((set) => ({
  dark: saved,
  toggleDark: () =>
    set((state) => {
      const newDark = !state.dark;
      const html = document.documentElement;

      if (newDark) html.classList.add("dark");
      else html.classList.remove("dark");

      localStorage.setItem("theme", newDark ? "dark" : "light");
      return { dark: newDark };
    }),
}));
