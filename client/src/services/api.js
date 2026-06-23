import axios from "axios";

const API = import.meta.env.VITE_API_URL;

axios.post(`${API}/auth/login`, data);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
