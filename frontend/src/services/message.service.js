import api from "./api";

// Get previous chat messages
export const getMessages = async () => {
  try {
    const response = await api.get("/messages");

    return response.data;
  } catch (error) {
    console.error(
      "Get Messages API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// Send message using REST API
export const sendMessage = async (username, text) => {
  try {
    const response = await api.post("/messages", {
      username,
      text,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Send Message API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};