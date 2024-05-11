"use client";
import { MAIN } from "@/utils/apiRoute";
import React, { FC, createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";
interface SocketProviderProp {
  children: React.ReactNode;
}

interface SocketContextType {
  socket: Socket;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket?.socket;
};
const SocketProvider: FC<SocketProviderProp> = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:8080"), []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
