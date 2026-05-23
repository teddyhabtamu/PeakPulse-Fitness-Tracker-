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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_email");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// Login API
export const login = (email, password) => {
  return api.post("/auth/signin", { email, password });
};

// Signup API
export const signup = (name, email, password) => {
  return api.post("/auth/signup", { name, email, password });
};

// Forgot Password API
export const forgotPassword = (email) => {
  return api.post("/auth/forgot-password", { email });
};

// Reset Password API
export const resetPassword = (token, password) => {
  return api.post("/auth/reset-password", { token, password });
};

// Google OAuth API
export const googleAuth = (credential) => {
  return api.post("/auth/google", { credential });
};

// Protected Route Example
export const getProtectedData = () => {
  return api.get("/auth/protected-route");
};

export default api;
