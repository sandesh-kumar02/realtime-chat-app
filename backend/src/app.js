import express from "express";
import cors from "cors";

const app = express();

import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

export default app;