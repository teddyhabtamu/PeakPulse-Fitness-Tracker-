import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lightTheme, darkTheme } from "./utils/Themes";
import Authentication from "./pages/Authentication";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Tutorials from "./pages/Tutorials";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import ProfileSettings from "./pages/ProfileSettings";
import InstallPopup from "./components/InstallPopup";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  transition: background 0.25s ease, color 0.25s ease;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: margin-left 0.3s ease;

  @media (min-width: 769px) {
    margin-left: ${({ collapsed }) => collapsed ? "64px" : "260px"};
  }

  @media (max-width: 768px) {
    padding-top: 56px;
  }
`;

function App() {
  const [user, setUser] = useState(null);
  const [themeMode, setThemeMode] = useState("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const isTokenExpired = (token) => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
      } catch {
        return true;
      }
    };

    const loadUserFromStorage = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("user_name");
      const email = localStorage.getItem("user_email");
      const isAdmin = localStorage.getItem("user_is_admin") === "true";
      if (token && !isTokenExpired(token)) {
        setUser({ token, name: name || "User", email: email || "", is_admin: isAdmin });
      } else if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_is_admin");
      }
    };

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setThemeMode(savedTheme);

    loadUserFromStorage();

    window.addEventListener("user-profile-updated", loadUserFromStorage);
    return () => window.removeEventListener("user-profile-updated", loadUserFromStorage);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_is_admin");
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <Router>
        <Container>
          {user ? (
            <>
              <Navbar
                currentUser={user}
                onLogout={handleLogout}
                themeMode={themeMode}
                toggleTheme={toggleTheme}
                collapsed={sidebarCollapsed}
                onToggleCollapse={toggleSidebar}
              />
              <PageContent collapsed={sidebarCollapsed}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/workouts" element={<Workouts />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<ProfileSettings />} />
                  {user?.is_admin && <Route path="/admin" element={<AdminDashboard />} />}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </PageContent>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Authentication onLogin={handleLogin} formType="signin" />} />
              <Route path="/signup" element={<Authentication onLogin={handleLogin} formType="signup" />} />
              <Route path="/forgot-password" element={<Authentication formType="forgot-password" />} />
              <Route path="/reset-password/:token" element={<Authentication formType="reset-password" />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </Container>
        <InstallPopup />
      </Router>
    </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

