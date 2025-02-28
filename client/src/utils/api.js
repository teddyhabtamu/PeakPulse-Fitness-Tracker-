import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`, // Base URL from .env
  withCredentials: true, // Allow cookies and sessions across origins
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach JWT token to every request
  }
  return config;
});

// Login API
export const login = (email, password) => {
  return api.post("/auth/signin", { email, password });
};

// Signup API
export const signup = (full_name, email, password) => {
  return api.post("/auth/signup", { full_name, email, password });
};

// Protected Route Example
export const getProtectedData = () => {
  return api.get("/auth/protected-route");
};

export default api;
