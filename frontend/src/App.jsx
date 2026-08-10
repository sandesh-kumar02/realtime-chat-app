import { useState } from "react";
import Login from "./pages/LoginForm.jsx";
import Chat from "./pages/Chat.jsx";

import './App.css'

function App() {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("chatUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const handleLogin = (loggedInUser) => {
    localStorage.setItem(
      "chatUser",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("chatUser");
    setUser(null);
  };
   if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Chat
      user={user}
      onLogout={handleLogout}
    />
  );
}

export default App;