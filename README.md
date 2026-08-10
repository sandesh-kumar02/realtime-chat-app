# Real-Time Chat Application

A real-time chat application built with **React, Node.js, Express, Socket.io, and MongoDB**.

The application allows users to join a chat using a username, send and receive messages instantly through Socket.io, view previous chat history, and see message timestamps. Messages are persisted in MongoDB so that chat history remains available after refreshing the application.

---

## 🚀 Features

### Core Features

* Username-based login
* Clean and responsive chat interface
* Send messages
* Receive messages instantly using Socket.io
* Real-time message broadcasting
* Previous messages available after page refresh
* Message timestamps
* Online/offline connection status
* User connection and disconnection handling
* REST API for sending messages
* REST API for fetching chat history
* MongoDB message persistence
* API and Socket error handling

### Bonus Features

* Typing indicator
* Username-based dummy authentication
* MongoDB persistence

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Socket.io Client

## Backend

* Node.js
* Express.js
* Socket.io
* MongoDB
* Mongoose
* dotenv
* CORS

---

# 📁 Project Structure

```text
realtime-chat-app/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── MessageList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Chat.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.service.js
│   │   │   └── message.service.js
│   │   │
│   │   ├── socket/
│   │   │   ├── socket.js
│   │   │   └── socketEvents.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── message.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── models/
│   │   │   ├── Message.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── message.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── middleware/
│   │   │
│   │   ├── socket/
│   │   │   └── socket.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Prerequisites

Make sure the following are installed:

* Node.js 18+
* npm
* MongoDB Atlas account or local MongoDB
* Git

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

# 📥 Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project:

```bash
cd realtime-chat-app
```

---

# 🔧 Backend Setup

Go to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

CLIENT_URL=http://localhost:3000
```

### Start Backend

Development mode:

```bash
nodemon server.js
```

Backend will run on:

```text
http://localhost:3000
```

---

# 🎨 Frontend Setup

Open another terminal.

Go to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

## Backend

| Variable      | Description               |
| ------------- | ------------------------- |
| `PORT`        | Backend server port       |
| `MONGODB_URI` | MongoDB connection string |
| `CLIENT_URL`  | Frontend URL              |

Example:

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/realtimechat
CLIENT_URL=http://localhost:5173
```

## Frontend

| Variable          | Description               |
| ----------------- | ------------------------- |
| `VITE_API_URL`    | Backend REST API base URL |
| `VITE_SOCKET_URL` | Socket.io server URL      |

Example:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

> Never commit real `.env` files or database credentials to GitHub.

---

# 🔌 REST API

## 1. Login / Username

### Request

```http
POST /api/users/login
```

### Body

```json
{
  "username": "sandesh"
}
```

### Example Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "username": "sandesh"
  }
}
```

---

## 2. Send Message

### Request

```http
POST /api/messages
```

### Body

```json
{
  "username": "sandesh",
  "text": "Hello everyone!"
}
```

---

## 3. Fetch Chat History

### Request

```http
GET /api/messages
```

Returns previously stored messages from MongoDB.

---

# ⚡ Socket.io Events

Socket.io is used for real-time communication.

## Client → Server

### `join_chat`

Triggered when a user connects to the chat.

```js
socket.emit("join_chat", username);
```

---

### `send_message`

Used to send a new message.

```js
socket.emit("send_message", {
  username,
  text
});
```

---

### `typing_start`

Triggered when a user starts typing.

```js
socket.emit("typing_start", username);
```

---

### `typing_stop`

Triggered when a user stops typing.

```js
socket.emit("typing_stop", username);
```

---

# 📡 Server → Client

### `receive_message`

Broadcasts a new message to connected users.

```js
socket.on("receive_message", (message) => {
  // update messages
});
```

---

### `user_joined`

Notifies connected users when someone joins.

---

### `user_left`

Notifies connected users when someone disconnects.

---

### `user_typing`

Shows the typing indicator.

Example:

```text
Rahul is typing...
```

---

### `user_stopped_typing`

Removes the typing indicator.

---

# 🗄️ Data Model

Messages are stored in MongoDB.

Example document:

```json
{
  "_id": "ObjectId",
  "username": "sandesh",
  "text": "Hello Rahul!",
  "createdAt": "2026-08-10T12:30:00.000Z",
  "updatedAt": "2026-08-10T12:30:00.000Z"
}
```

Mongoose timestamps are used to automatically store message creation time.

---

# 🔄 Application Flow

```text
                    ┌───────────────┐
                    │     React     │
                    │   Frontend    │
                    └───────┬───────┘
                            │
               ┌────────────┴────────────┐
               │                         │
               ▼                         ▼
        REST API / Axios           Socket.io Client
               │                         │
               ▼                         ▼
        ┌──────────────┐          ┌──────────────┐
        │   Express    │          │   Socket.io  │
        │   Backend    │          │    Server    │
        └──────┬───────┘          └──────┬───────┘
               │                         │
               └────────────┬────────────┘
                            ▼
                     ┌──────────────┐
                     │   MongoDB    │
                     │   Database   │
                     └──────────────┘
```

---

# 💬 Real-Time Message Flow

When a user sends a message:

```text
User types message
       ↓
React MessageInput
       ↓
Socket.io Client
       ↓
send_message event
       ↓
Socket.io Server
       ↓
Save message to MongoDB
       ↓
receive_message event
       ↓
Connected clients receive message
       ↓
React updates MessageList
```

This allows messages to appear instantly without refreshing the page.

---

# 🧠 Design Decisions

### 1. Socket.io for real-time communication

Socket.io was selected because real-time communication is a mandatory requirement of the project.

It provides:

* Persistent connections
* Real-time events
* Connection/disconnection handling
* Easy broadcasting

---

### 2. REST APIs for persistent data

REST APIs are used for operations that require database access such as:

* Login
* Fetching chat history
* Sending messages

This separates persistent data operations from real-time communication.

---

### 3. MongoDB for message persistence

MongoDB was selected because it works naturally with Node.js and provides a flexible document-based structure for storing chat messages.

---

### 4. Reusable React components

The frontend separates UI responsibilities into components such as:

* `ChatHeader`
* `MessageList`
* `MessageInput`

This makes the application easier to maintain and extend.

---

### 5. Centralized API and Socket configuration

API communication is handled through service files, while Socket.io events are centralized in:

```text
src/socket/
```

This avoids scattering connection and event configuration throughout the application.

---

# 🛡️ Error Handling

The application handles:

* Invalid login requests
* Empty messages
* API failures
* Socket connection errors
* Socket disconnections
* MongoDB errors

Errors are logged on the backend and handled gracefully on the frontend.

---

# 🧪 Testing

The application can be tested using two browser windows.

### Example

```text
Chrome
Username: Sandesh

Incognito
Username: Rahul
```

Send a message from Sandesh:

```text
Hello Rahul!
```

Rahul should receive the message instantly without refreshing.

### Refresh Test

Refresh the browser and verify that previous messages are loaded from MongoDB.

### Typing Test

Start typing from one browser.

The other browser should display:

```text
Sandesh is typing...
```

### Disconnect Test

Close one browser window and verify that the backend detects the socket disconnection.

---

# 📌 Assumptions

* Authentication is username-based and intended for demonstration purposes.
* No password or production authentication system is implemented.
* The chat is a shared real-time chat room.
* Messages are persisted in MongoDB.
* Socket.io is used as the required real-time communication layer.
* The application is intended as an assessment/demo project rather than a production messaging platform.

---

# 🚀 Future Improvements

The application can be extended with:

* Private one-to-one conversations
* User authentication with JWT
* Online user list
* Read/delivered message status
* Message deletion
* Message editing
* Image/file sharing
* Push notifications
* Message search
* Chat rooms
* Production deployment

---

# 📋 Assessment Requirements

| Requirement              | Status  |
| ------------------------ | ------- |
| React Frontend           | ✅       |
| Clean Chat Interface     | ✅       |
| Send Messages            | ✅       |
| Instant Message Delivery | ✅       |
| Previous Messages        | ✅       |
| Message Timestamps       | ✅       |
| Node.js + Express        | ✅       |
| Send Message API         | ✅       |
| Chat History API         | ✅       |
| Socket.io                | ✅       |
| Real-Time Broadcasting   | ✅       |
| Connection Handling      | ✅       |
| Disconnection Handling   | ✅       |
| Clean Architecture       | ✅       |
| Error Handling           | ✅       |
| MongoDB Persistence      | ✅ Bonus |
| Username Login           | ✅ Bonus |
| Typing Indicator         | ✅ Bonus |

---

# 👨‍💻 Author

**Sandesh Kumar**

Built as a real-time chat application assessment project using React, Node.js, Express, Socket.io, and MongoDB.