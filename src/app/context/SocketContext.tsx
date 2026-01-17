import React, { createContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Fallback to localhost:3004 if env variable is not set
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:3004";
console.log("Socket URL:", SOCKET_URL);

const socket = io(SOCKET_URL, {
    withCredentials: true,
});

// Debug: Log socket connection events
socket.on("connect", () => {
    console.log("✅ Socket connected! ID:", socket.id);
});

socket.on("connect_error", (error) => {
    console.error("❌ Socket connection error:", error.message);
});

socket.on("disconnect", (reason) => {
    console.log("⚠️ Socket disconnected:", reason);
});

export const SocketContext = createContext<Socket>(socket);

interface SocketProviderProps {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};