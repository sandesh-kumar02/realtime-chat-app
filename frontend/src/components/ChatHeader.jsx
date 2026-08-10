const ChatHeader = ({ username, onLogout }) => {
  return (
    <header className="flex items-center justify-between border-b bg-white px-5 py-4">
      <div>
        <h1 className="text-lg font-bold text-gray-900">
          Realtime Chat
        </h1>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />

          <p className="text-xs text-gray-500">
            {username}
          </p>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
      >
        Logout
      </button>
    </header>
  );
};

export default ChatHeader;