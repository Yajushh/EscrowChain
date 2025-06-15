import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(): Socket {
  const socketRef = useRef<Socket>(
    io("http://localhost:4000", { withCredentials: true })
  );

  useEffect(() => {
    const socket = socketRef.current;
    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef.current;
}
