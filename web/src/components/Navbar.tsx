import { AuthStore } from "../store/authStore";
import axios from "axios";
export default function Navbar() {
  const isLoggedIn = AuthStore((state) => state.isLoggedIn);
  const user = AuthStore((state) => state.user);
  const logout = AuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        logout();
        return;
      } else {
        alert("Error logging out");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="bg-slate-50 shadow-md px-4 py-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="/"
          className="text-2xl text-indigo-700 italic font-bold font-heading uppercase tracking-wider
"
        >
          Escrow
        </a>

        <div className="hidden md:flex space-x-6 items-center font-bold font-sans uppercase tracking-wider text-md">
          <a
            href="/escrow"
            className="text-indigo-900 hover:text-black transition"
          >
            Create Escrow
          </a>
          <a href="#" className="text-gray-600 hover:text-black transition">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-black transition">
            Services
          </a>
          {isLoggedIn ? (
            <div className="flex space-x-6">
              <a className="text-indigo-600 hover:text-indigo-500 transition font-bold cursor-pointer  ">
                Hey, {user?.name} 👋
              </a>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <a
              href="/login"
              className="text-gray-600 hover:text-black transition"
            >
              Login
            </a>
          )}
        </div>

        <div className="md:hidden">
          <button id="menu-btn" className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="md:hidden hidden px-4 pt-2 pb-4 space-y-2"
      >
        <a href="#" className="block text-gray-600 hover:text-black">
          Home
        </a>
        <a href="#" className="block text-gray-600 hover:text-black">
          About
        </a>
        <a href="#" className="block text-gray-600 hover:text-black">
          Services
        </a>
        <a href="#" className="block text-gray-600 hover:text-black">
          Contact
        </a>
      </div>
    </nav>
  );
}
