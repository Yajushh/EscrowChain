import { useState } from "react";
import SearchQuery from "./SearchQuery";
// import { useSocket } from "../hooks/useSocket";
import CurrencyList from "./CurrencyList";
import axios from "axios";
import type { CreateEscrowPayload } from "../utils/Payload";
import { AuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

interface EscrowResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  amount: number;
  balance: number;
  currency: string;
  payerId: string;
  payeeId: string;
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

export default function EscrowCard() {
  const navigate = useNavigate();
  const currentUser = AuthStore((state) => state.user);
  const [user, setUser] = useState<User>();
  const [currency, setCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async () => {
    const endpoint = "http://localhost:4000/api/escrows";
    try {
      const payload: CreateEscrowPayload = {
        payerId: currentUser?.id as string,
        payeeId: user?.id as string,
        amount,
        currency,
      };

      const res = await axios.post<EscrowResponse>(endpoint, payload, {
        withCredentials: true,
      });
      if (res.status === 201) {
        navigate(`/escrow/${res.data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl max-w-[600px] w-full mx-auto border border-gray-200 dark:border-indigo-500/30 overflow-hidden transition-colors duration-300
      dark:shadow-[0_0_12px_rgba(99,102,241,0.4)]"
    >
      <div className="flex flex-col w-full h-full px-6 py-6 space-y-6">
        <h1 className="text-indigo-700 dark:text-indigo-400 text-3xl font-bold text-center">
          Create an Escrow
        </h1>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Payee
            </label>
            <SearchQuery onSelect={(user) => setUser(user)} />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Currency
            </label>
            <CurrencyList onSelect={(value) => setCurrency(value)} />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Enter amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
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
