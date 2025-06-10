import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket() {
  const socketRef = useRef<Socket>();
  useEffect(() => {
    socketRef.current = io("http://localhost:4000", { withCredentials: true });
    socketRef.current.on("connect", () => {
      console.log(`Socket connection established: ${socketRef.current?.id}`);
    });
    socketRef.current.on("connect_error", (err) => {
      console.log(
        `Socket connection error for socket: ${socketRef.current?.id} with error: ${err}`
      );
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
  return socketRef.current!;
}
