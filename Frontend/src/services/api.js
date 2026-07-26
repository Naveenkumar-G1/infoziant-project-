import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const rawAuthData = localStorage.getItem("authData");
  if (rawAuthData) {
    try {
      const authData = JSON.parse(rawAuthData);
      if (authData?.token) {
        config.headers.Authorization = `Bearer ${authData.token}`;
      }
    } catch (error) {
      console.error("Failed to read auth token", error);
    }
  }

  return config;
});

export default api;
