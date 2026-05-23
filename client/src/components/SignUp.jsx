import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { signup, googleAuth } from "../utils/api";
import { useNavigate } from "react-router-dom";
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

const Terms = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin: 0;
  line-height: 1.5;

  a {
    color: #174657;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
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

const SignUp = ({ onLogin }) => {
  const [name, setName] = useState("");
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
      const { token, name: userName, email: userEmail } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user_name", userName || "");
      localStorage.setItem("user_email", userEmail || "");
      if (onLogin) onLogin({ token, name: userName, email: userEmail });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Google sign-up failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google sign-up was cancelled or failed.");
  };

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signup(name, email, password);
      navigate("/signin");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        console.error("Sign Up Error:", error);
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Create your account</Title>
        <Subtitle>Start tracking your fitness journey today</Subtitle>
      </Header>
      <StyledForm onSubmit={handleSubmit}>
        <TextInput
          label="Full Name"
          placeholder="John Doe"
          value={name}
          handleChange={handleChangeName}
        />
        <TextInput
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          value={email}
          handleChange={handleChangeEmail}
        />
        <TextInput
          label="Password"
          placeholder="Create a strong password"
          password
          value={password}
          handleChange={handleChangePassword}
          autoComplete="off"
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
          {!loading && <FaArrowRight size={14} />}
        </SubmitButton>
        <Divider><span>or continue with</span></Divider>
        {googleLoading ? (
          <GoogleButton type="button" disabled>
            <FaGoogle size={16} />
            Signing up...
          </GoogleButton>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            shape="pill"
            size="large"
            width="100%"
            text="signup_with"
          />
        )}
        <Terms>
          By signing up, you agree to our{" "}
          <a href="/terms-of-service">Terms of Service</a> and{" "}
          <a href="/privacy-policy">Privacy Policy</a>
        </Terms>
      </StyledForm>
    </Container>
  );
};

export default SignUp;
