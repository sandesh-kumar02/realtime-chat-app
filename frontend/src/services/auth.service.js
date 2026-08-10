import api from "./api";

export const loginUser = async (username) => {
  try {
    const response = await api.post("/users/login", {
      username,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};