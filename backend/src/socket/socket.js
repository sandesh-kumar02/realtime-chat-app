import Message from "../models/Message.js";

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // User joins chat
    socket.on("join_chat", (username) => {
      socket.username = username;

      console.log(`${username} joined the chat`);

      socket.broadcast.emit("user_joined", {
        username,
        message: `${username} joined the chat`,
      })
      socket.on("typing_start", (username) => {
  socket.broadcast.emit("user_typing", {
    username,
  });
});

socket.on("typing_stop", (username) => {
  socket.broadcast.emit("user_stopped_typing", {
    username,
  });
});
    });

    // Receive and broadcast message
    socket.on("send_message", async (data) => {
      try {
        const { username, text } = data;

        if (!username || !text?.trim()) {
          socket.emit("socket_error", {
            message: "Username and message are required",
          });
          return;
        }

        // Save message to MongoDB
        const message = await Message.create({
          sender: socket.userId || undefined,
          username,
          text: text.trim(),
        });

        // Send saved message to all connected users
        io.emit("receive_message", {
          _id: message._id,
          username: message.username,
          text: message.text,
          createdAt: message.createdAt,
        });
      } catch (error) {
        console.error("Socket message error:", error);

        socket.emit("socket_error", {
          message: "Failed to send message",
        });
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);

      if (socket.username) {
        socket.broadcast.emit("user_left", {
          username: socket.username,
          message: `${socket.username} left the chat`,
        });
      }
    });
  });
};

export default initializeSocket;