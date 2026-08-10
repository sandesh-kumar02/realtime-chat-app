const MessageBubble = ({ message, isMine }) => {
  const time = new Date(
    message.createdAt
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isMine
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md bg-gray-200 text-gray-900"
        }`}
      >
        {!isMine && (
          <p className="mb-1 text-xs font-semibold text-blue-600">
            {message.username}
          </p>
        )}

        <p className="break-words text-sm">
          {message.text}
        </p>

        <p
          className={`mt-1 text-[10px] ${
            isMine
              ? "text-blue-100"
              : "text-gray-500"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;