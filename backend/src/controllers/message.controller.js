import Message from "../models/Message.js";
import User from "../models/User.js";

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!username || !text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username and message are required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const message = await Message.create({
  sender,
  receiver,
  text: text.trim(),
});

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

// Fetch chat history
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: 1 })
      .populate("sender", "username");

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};