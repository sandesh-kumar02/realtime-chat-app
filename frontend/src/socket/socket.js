// import { io } from "socket.io-client";

// const SOCKET_URL =
//   import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// const socket = io(SOCKET_URL, {
//   autoConnect: true,
//   transports: ["websocket", "polling"],
// });

// export default socket;

import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

const socket = io(SOCKET_URL, {
  autoConnect: true,
  transports: ["polling", "websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error.message);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Socket disconnected:", reason);
});

export default socket;