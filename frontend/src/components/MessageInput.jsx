import { useEffect, useRef, useState } from "react";

import socket from "../socket/socket";
import { SOCKET_EVENTS } from "../socket/socketEvents";

const MessageInput = ({
  username,
  onSend,
  disabled = false,
}) => {
  const [text, setText] = useState("");

  const typingTimeoutRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;

    setText(value);

    if (disabled) return;

    if (value.trim()) {
      socket.emit(
        SOCKET_EVENTS.TYPING_START,
        username
      );

      clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit(
          SOCKET_EVENTS.TYPING_STOP,
          username
        );
      }, 1000);
    } else {
      socket.emit(
        SOCKET_EVENTS.TYPING_STOP,
        username
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = text.trim();

    if (!message || disabled) return;

    socket.emit(
      SOCKET_EVENTS.TYPING_STOP,
      username
    );

    onSend(message);

    setText("");
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeoutRef.current);

      socket.emit(
        SOCKET_EVENTS.TYPING_STOP,
        username
      );
    };
  }, [username]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-t bg-white p-4"
    >
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
      />

      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;