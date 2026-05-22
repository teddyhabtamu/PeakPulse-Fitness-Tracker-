import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL || 'http://localhost:5000'}/api`, // Fallback to server if env var missing
  withCredentials: true, // Allow cookies and sessions across origins
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login API
export const login = (email, password) => {
  return api.post("/auth/signin", { email, password });
};

// Signup API
export const signup = (name, email, password) => {
  return api.post("/auth/signup", { name, email, password });
};

// Protected Route Example
export const getProtectedData = () => {
  return api.get("/auth/protected-route");
};

export default api;
