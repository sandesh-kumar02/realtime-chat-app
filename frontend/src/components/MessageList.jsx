import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, username }) => {
  if (!messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-5">
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          isMine={message.username === username}
        />
      ))}
    </div>
  );
};

export default MessageList;