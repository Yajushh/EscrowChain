import { useState } from "react";
import SearchQuery from "./SearchQuery";
import { useSocket } from "../hooks/useSocket";
import CurrencyList from "./CurrencyList";

export default function EscrowCard() {
  const socket = useSocket();
  const [payeeId, setPayeeId] = useState<string>("");
  const handleSubmit = async () => {
    const endpoint = "http://localhost:4000/api/escrows";

    return console.log("done");
  };
  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-[600px] w-full mx-auto border border-gray-200 overflow-hidden">
      <div className="flex flex-col w-full h-full px-6 py-5 space-y-6">
        <h1 className="text-indigo-700 text-3xl font-bold text-center">
          Create an Escrow
        </h1>

        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600 font-medium">Payee</label>
            <SearchQuery />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600 font-medium">
              Currency
            </label>
            <CurrencyList />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600 font-medium">
              Enter amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
