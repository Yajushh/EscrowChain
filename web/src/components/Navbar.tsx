import { AuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import axios from "axios";
import { CiDark } from "react-icons/ci";
import { IoMdSunny } from "react-icons/io";

export default function Navbar() {
  const isLoggedIn = AuthStore((state) => state.isLoggedIn);
  const user = AuthStore((state) => state.user);
  const logout = AuthStore((state) => state.logout);

  const { dark, toggleDark } = useThemeStore();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) logout();
      else alert("Error logging out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 w-full text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="font-heading text-3xl font-bold text-indigo-600 dark:text-indigo-300 tracking-widest italic"
        >
          Escrow
          <span className="text-indigo-900 dark:text-indigo-200">Chain</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-md font-medium">
          <a
            href="/escrow"
            className="hover:text-indigo-700 dark:hover:text-indigo-300 transition"
          >
            Create Escrow
          </a>
          <a
            href="#"
            className="text-gray-500 dark:text-gray-300 hover:text-indigo-500 transition"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-500 dark:text-gray-300 hover:text-indigo-500 transition"
          >
            Services
          </a>

          {isLoggedIn ? (
            <>
              <span className="text-indigo-700 dark:text-indigo-300 font-semibold">
                Hey, {user?.name} 👋
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition font-semibold"
            >
              Login
            </a>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDark}
            className="ml-2 p-2 rounded-full backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-gray-800 dark:text-gray-100 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 outline-none"
          >
            <span className="text-xl">{dark ? <IoMdSunny /> : <CiDark />}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button id="menu-btn" className="focus:outline-none">
            <svg
              className="w-7 h-7 text-gray-800 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (still static) */}
      <div
        id="mobile-menu"
        className="md:hidden hidden px-6 pb-4 pt-2 space-y-3 text-sm"
      >
        <a
          href="/"
          className="block text-gray-600 dark:text-gray-300 hover:text-indigo-700"
        >
          Home
        </a>
        <a
          href="#"
          className="block text-gray-600 dark:text-gray-300 hover:text-indigo-700"
        >
          About
        </a>
        <a
          href="#"
          className="block text-gray-600 dark:text-gray-300 hover:text-indigo-700"
        >
          Services
        </a>
        {isLoggedIn ? (
          <>
            <span className="block text-indigo-700 dark:text-indigo-300 font-semibold">
              Hey, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="block text-indigo-600 dark:text-indigo-300 font-semibold px-4 py-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-700"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
