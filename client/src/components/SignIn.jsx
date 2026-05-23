import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { useNavigate } from "react-router-dom";
import { login, googleAuth } from "../utils/api";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  font-weight: 400;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ForgotLink = styled.button`
  background: none;
  border: none;
  color: #174657;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  align-self: flex-end;
  transition: opacity 0.2s ease;
  font-family: inherit;

  &:hover {
    opacity: 0.8;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 28px;
  background: linear-gradient(135deg, #174657, #0F2C38);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(23, 70, 87, 0.25);
  font-family: inherit;
  margin-top: 4px;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(23, 70, 87, 0.35);

    svg {
      transform: translateX(4px);
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMsg = styled.div`
  background: rgba(239, 68, 68, 0.08);
  color: #EF4444;
  font-size: 13px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(239, 68, 68, 0.15);
  font-weight: 500;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.text_secondary}33;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
    font-weight: 500;
    white-space: nowrap;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 13px 28px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_secondary}33;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  svg {
    color: #DB4437;
  }

  &:hover {
    background: ${({ theme }) => theme.text_secondary}11;
    border-color: ${({ theme }) => theme.text_secondary}55;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    setError("");
    try {
      const response = await googleAuth(credentialResponse.credential);
      const { token, name, email: userEmail } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user_name", name || "");
      localStorage.setItem("user_email", userEmail || "");
      onLogin({ token, name, email: userEmail });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Google sign-in failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google sign-in was cancelled or failed.");
  };

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(email, password);
      const { token, name, email: userEmail } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user_name", name || "");
      localStorage.setItem("user_email", userEmail || "");
      onLogin({ token, name, email: userEmail });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Welcome back</Title>
        <Subtitle>Sign in to continue to your dashboard</Subtitle>
      </Header>
      <StyledForm onSubmit={handleSubmit}>
        <TextInput
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          value={email}
          handleChange={handleChangeEmail}
        />
        <div>
          <TextInput
            label="Password"
            placeholder="Enter your password"
            password
            value={password}
            handleChange={handleChangePassword}
            autoComplete="off"
          />
          <ForgotLink type="button" onClick={() => navigate("/forgot-password")}>Forgot password?</ForgotLink>
        </div>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
          {!loading && <FaArrowRight size={14} />}
        </SubmitButton>
        <Divider><span>or continue with</span></Divider>
        {googleLoading ? (
          <GoogleButton type="button" disabled>
            <FaGoogle size={16} />
            Signing in...
          </GoogleButton>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            shape="pill"
            size="large"
            width="100%"
            text="signin_with"
          />
        )}
      </StyledForm>
    </Container>
  );
};

export default SignIn;
