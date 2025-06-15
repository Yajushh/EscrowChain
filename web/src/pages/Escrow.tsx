import EscrowCard from "../components/EscrowCard";
import { useThemeStore } from "../store/themeStore";

export default function Escrow() {
  const dark = useThemeStore((state) => state.dark);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="fixed min-h-screen w-full flex items-center justify-center px-4 py-20 text-white overflow-hidden bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
        <EscrowCard />
      </div>
    </div>
  );
}
