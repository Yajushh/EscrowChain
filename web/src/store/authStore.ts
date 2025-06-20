import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../components/LoginForm";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) =>
        set(() => ({
          user,
          isLoggedIn: true,
        })),
      logout: () =>
        set(() => ({
          user: null,
          isLoggedIn: false,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
