import { useEffect, useState } from "react";

import socket from "../socket/socket";
import { SOCKET_EVENTS } from "../socket/socketEvents";
import { getMessages } from "../services/message.service";

import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

const Chat = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] =
    useState("Connecting...");

  // Which user is currently typing
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    // --------------------------------
    // 1. Load old messages
    // --------------------------------
    const loadMessages = async () => {
      try {
        const data = await getMessages();

        setMessages(data.messages || []);
      } catch (error) {
        console.error(
          "Failed to load chat history:",
          error
        );
      }
    };

    loadMessages();

    // --------------------------------
    // 2. Socket connected
    // --------------------------------
    const handleConnect = () => {
      console.log("🟢 Socket connected");

      setConnectionStatus("Online");

      socket.emit(
        SOCKET_EVENTS.JOIN_CHAT,
        user.username
      );
    };

    // --------------------------------
    // 3. Socket disconnected
    // --------------------------------
    const handleDisconnect = () => {
      console.log("🔴 Socket disconnected");

      setConnectionStatus("Offline");
      setTypingUser("");
    };

    // --------------------------------
    // 4. Receive new message
    // --------------------------------
    const handleReceiveMessage = (message) => {
      setMessages((previousMessages) => [
        ...previousMessages,
        message,
      ]);

      // Message aane ke baad typing indicator hata do
      setTypingUser("");
    };

    // --------------------------------
    // 5. Socket error
    // --------------------------------
    const handleSocketError = (error) => {
      console.error("❌ Socket error:", error);
    };

    // --------------------------------
    // 6. Someone started typing
    // --------------------------------
    const handleUserTyping = ({ username }) => {
      // Apna typing indicator mat dikhana
      if (username === user.username) {
        return;
      }

      setTypingUser(username);
    };

    // --------------------------------
    // 7. Someone stopped typing
    // --------------------------------
    const handleUserStoppedTyping = ({ username }) => {
      if (username === user.username) {
        return;
      }

      setTypingUser("");
    };

    // --------------------------------
    // Register socket listeners
    // --------------------------------

    socket.on(
      SOCKET_EVENTS.CONNECT,
      handleConnect
    );

    socket.on(
      SOCKET_EVENTS.DISCONNECT,
      handleDisconnect
    );

    socket.on(
      SOCKET_EVENTS.RECEIVE_MESSAGE,
      handleReceiveMessage
    );

    socket.on(
      SOCKET_EVENTS.SOCKET_ERROR,
      handleSocketError
    );

    socket.on(
      SOCKET_EVENTS.USER_TYPING,
      handleUserTyping
    );

    socket.on(
      SOCKET_EVENTS.USER_STOPPED_TYPING,
      handleUserStoppedTyping
    );

    // Agar socket already connected hai
    if (socket.connected) {
      handleConnect();
    }

    // --------------------------------
    // Cleanup
    // --------------------------------
    return () => {
      socket.off(
        SOCKET_EVENTS.CONNECT,
        handleConnect
      );

      socket.off(
        SOCKET_EVENTS.DISCONNECT,
        handleDisconnect
      );

      socket.off(
        SOCKET_EVENTS.RECEIVE_MESSAGE,
        handleReceiveMessage
      );

      socket.off(
        SOCKET_EVENTS.SOCKET_ERROR,
        handleSocketError
      );

      socket.off(
        SOCKET_EVENTS.USER_TYPING,
        handleUserTyping
      );

      socket.off(
        SOCKET_EVENTS.USER_STOPPED_TYPING,
        handleUserStoppedTyping
      );
    };
  }, [user.username]);

  // --------------------------------
  // Send message
  // --------------------------------
  const handleSendMessage = (text) => {
    socket.emit(
      SOCKET_EVENTS.SEND_MESSAGE,
      {
        username: user.username,
        text,
      }
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <ChatHeader
          username={user.username}
          onLogout={onLogout}
        />

        {/* Connection Status */}
        <div className="border-b bg-white px-5 py-2">
          <p className="text-xs text-gray-500">
            <span
              className={`mr-2 inline-block h-2 w-2 rounded-full ${
                connectionStatus === "Online"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            />

            {connectionStatus}
          </p>
        </div>

        {/* Messages */}
        <MessageList
          messages={messages}
          username={user.username}
        />

        {/* Typing Indicator */}
        {typingUser && (
          <div className="border-t bg-white px-5 py-2">
            <p className="text-xs italic text-gray-500">
              <span className="font-semibold">
                {typingUser}
              </span>{" "}
              is typing...
            </p>
          </div>
        )}

        {/* Message Input */}
        <MessageInput
          username={user.username}
          onSend={handleSendMessage}
          disabled={connectionStatus !== "Online"}
        />
      </div>
    </main>
  );
};

export default Chat;