import { useParams } from "react-router-dom";
import type { EscrowByIdResponse } from "../utils/AxiosResponse";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthStore } from "../store/authStore";
import { EscrowRefund, EscrowRelease } from "../handlers/EscrowHandler";
import { fetchUser } from "../handlers/UserHandler";

export default function EscrowDetails() {
  const { id } = useParams();
  const endpoint = `http://localhost:4000/api/escrows/${id}`;

  const [data, setData] = useState<EscrowByIdResponse | null>(null);
  const [status, setStatus] = useState<string>("");

  const role = AuthStore((state) => state.user?.role);
  const isAdmin = role === "ADMIN" ? true : false;

  const [payerName, setPayerName] = useState<string>("");
  const [payeeName, setPayeeName] = useState<string>("");

  useEffect(() => {
    const fetchEscrow = async () => {
      try {
        const res = await axios.get<EscrowByIdResponse>(endpoint, {
          withCredentials: true,
        });
        if (res.status === 200) {
          console.log(res.data);
          setData(res.data);
          setStatus(res.data.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEscrow();
  }, [id]);

  useEffect(() => {
    const fetchUsers = () => {
      const payerId = data?.payerId;
      const payeeId = data?.payeeId;
      fetchUser(payerId as string, (data) => setPayerName(data.name));
      fetchUser(payeeId as string, (data) => setPayeeName(data.name));
      console.log(payeeId, payerId);
    };
    fetchUsers();
  }, [payerName, payeeName, data?.payerId, data?.payeeId]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 px-8 py-10 space-x-8">
      <div className="w-1/3 space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-indigo-700">Escrow Details</h2>
          <ul className="text-gray-800 text-lg leading-relaxed space-y-2">
            <li>
              <span className="font-semibold">Escrow ID:</span> {data?.id}
            </li>
            <li>
              <span className="font-semibold">Payer:</span> {payerName}
            </li>
            <li>
              <span className="font-semibold">Payee:</span> {payeeName}
            </li>
            <li>
              <span className="font-semibold">Status:</span> {status}
            </li>
            <li>
              <span className="font-semibold">Currency:</span> {data?.currency}
            </li>
            <li>
              <span className="font-semibold">Amount:</span> {data?.amount}
            </li>
            <li>
              <span className="font-semibold">Current Escrow Balance:</span>{" "}
              {data?.balance}
            </li>
          </ul>
        </div>

        <div className="space-x-4 pt-4">
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition">
            Raise Conflict
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition">
            Mark as Completed
          </button>
          {isAdmin && (
            <div className="pt-6 space-y-3">
              <button
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
                onClick={() => {
                  EscrowRelease(endpoint, (data) =>
                    setStatus(data?.status as string)
                  );
                }}
              >
                Release Funds
              </button>
              <button
                className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition"
                onClick={() => {
                  EscrowRefund(endpoint, (data) =>
                    setStatus(data?.status as string)
                  );
                }}
              >
                Refund
              </button>
              <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg shadow-md transition">
                Close Escrow
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-2/3 bg-white rounded-xl shadow-lg flex flex-col ">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-700">Escrow Chat</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg w-fit max-w-[70%] overflow-y-hidden  ">
            Hi, I’ve completed my part of the task.
          </div>
          <div className="bg-indigo-100 p-3 rounded-lg w-fit max-w-[70%] self-end ml-auto">
            Noted! I’ll mark it completed soon.
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
