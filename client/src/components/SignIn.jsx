import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import "./buttonStyle.css";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api"; // Import login API

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(email, password); // Use Axios API
      console.log("Sign In Success:", response.data);

      localStorage.setItem("token", response.data.token); // Save Token
      onLogin(response.data.token); // Pass Token to Parent
      navigate("/"); // Redirect to Home Page
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Sign In 👋</Title>
        <Span>Please enter your credentials to sign in</Span>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "20px", flexDirection: "column" }}
      >
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handleChange={handleChangeEmail}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handleChange={handleChangePassword}
          autoComplete="off"
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button disabled={loading} type="submit">
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </Container>
  );
};

export default SignIn;
