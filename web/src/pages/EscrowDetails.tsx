import { useParams } from "react-router-dom";
import type { EscrowByIdResponse } from "../utils/AxiosResponse";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthStore } from "../store/authStore";
import { EscrowRefund, EscrowRelease } from "../handlers/EscrowHandler";
import { fetchUser } from "../handlers/UserHandler";
import { useSocket } from "../hooks/useSocket";
import type {
  EscrowFundedPayload,
  EscrowRefundedPayload,
  EscrowReleasedPayload,
} from "../utils/Payload";

export default function EscrowDetails() {
  const socket = useSocket();
  const { id: escrowId } = useParams<{ id: string }>();
  const endpoint = `http://localhost:4000/api/escrows/${escrowId}`;
  const role = AuthStore((state) => state.user?.role);
  const isAdmin = role === "ADMIN" ? true : false;

  const [data, setData] = useState<EscrowByIdResponse | null>(null);

  const [payerName, setPayerName] = useState<string>("");
  const [payeeName, setPayeeName] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleRelease = () => {
    if (!escrowId) return;
    setLoading(true);
    EscrowRelease(endpoint, (data) => {
      setLoading(false);
      if (data) {
        setData(
          (prev) =>
            prev && {
              ...prev,
              status: data.status,
              updatedAt: data.updatedAt,
              balance: data.balance,
            }
        );
      }
    });
  };
  const handleRefund = () => {
    if (!escrowId) return;
    setLoading(true);
    EscrowRefund(endpoint, (data) => {
      setLoading(false);
      if (data) {
        setData(
          (prev) =>
            prev && {
              ...prev,
              status: data.status,
              updatedAt: data.updatedAt,
              balance: data.balance,
            }
        );
      }
    });
  };

  useEffect(() => {
    socket.emit("joinEscrow", { escrowId });
    socket.on("escrowFunded", (data: EscrowFundedPayload) => {
      setData(
        (prev) =>
          prev && {
            ...prev,
            status: "FUNDED",
            updatedAt: data.fundedAt,
          }
      );
    });
    socket.on("escrowReleased", (data: EscrowReleasedPayload) => {
      setData(
        (prev) =>
          prev && {
            ...prev,
            status: "RELEASED",
            updatedAt: data.releasedAt,
          }
      );
    });
    socket.on("escrowRefunded", (data: EscrowRefundedPayload) => {
      setData(
        (prev) =>
          prev && {
            ...prev,
            status: "REFUNDED",
            updatedAt: data.refundedAt,
          }
      );
    });

    return () => {
      socket.off("escrowFunded");
      socket.off("escrowReleased");
      socket.off("escrowRefunded");
    };
  }, [escrowId, socket]);

  useEffect(() => {
    const fetchEscrow = async () => {
      try {
        const res = await axios.get<EscrowByIdResponse>(endpoint, {
          withCredentials: true,
        });
        if (res.status === 200) {
          console.log(res.data);
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEscrow();
  }, [escrowId, endpoint]);

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
  if (!escrowId) return <p>Loading...</p>;
  return (
    <div className=" flex flex-col lg:flex-row min-h-screen w-full bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 p-6 gap-6">
      {/* Left Panel */}
      <aside className="lg:w-1/3 space-y-6 p-6 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-md">
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          Escrow Details
        </h2>
        <ul className="text-md space-y-2">
          <li>
            <span className="font-semibold">ID:</span> {data?.id}
          </li>
          <li>
            <span className="font-semibold">Payer:</span> {payerName}
          </li>
          <li>
            <span className="font-semibold">Payee:</span> {payeeName}
          </li>
          <li>
            <span className="font-semibold">Status:</span> {data?.status}
          </li>
          <li>
            <span className="font-semibold">Currency:</span> {data?.currency}
          </li>
          <li>
            <span className="font-semibold">Amount:</span> {data?.amount}
          </li>
          <li>
            <span className="font-semibold">Balance:</span> {data?.balance}
          </li>
        </ul>

        <div className="pt-4 space-y-3">
          <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold">
            Raise Conflict
          </button>
          <button className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold">
            Mark Completed
          </button>
          {isAdmin && (
            <>
              <button
                onClick={handleRelease}
                disabled={loading}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold"
              >
                Release Funds
              </button>
              <button
                onClick={handleRefund}
                disabled={loading}
                className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-semibold"
              >
                Refund
              </button>
              <button className="w-full py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md font-semibold">
                Close Escrow
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Right Panel */}
      <main className="lg:w-2/3 flex flex-col bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md h-[calc(100vh-3rem)] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700 shrink-0">
          <h3 className="text-xl font-semibold">Escrow Chat</h3>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-lg w-fit max-w-[70%]">
            Hi, I’ve completed my part of the task.
          </div>
          <div className="bg-indigo-200 dark:bg-indigo-600 px-4 py-3 rounded-lg w-fit max-w-[70%] self-end ml-auto">
            Noted! I’ll mark it completed soon.
          </div>
          {/* More messages dynamically here */}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold">
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
