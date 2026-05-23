import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { forgotPassword } from "../utils/api";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

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

const SuccessMsg = styled.div`
  background: rgba(34, 197, 94, 0.08);
  color: #22C55E;
  font-size: 13px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(34, 197, 94, 0.15);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangeEmail = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container>
        <Header>
          <Title>Check your inbox</Title>
          <Subtitle>
            If an account exists with that email, we've sent a password reset link.
          </Subtitle>
        </Header>
        <SuccessMsg>
          <FaCheckCircle size={16} />
          Reset link sent successfully
        </SuccessMsg>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Reset password</Title>
        <Subtitle>
          Enter your email and we'll send you a reset link
        </Subtitle>
      </Header>
      <StyledForm onSubmit={handleSubmit}>
        <TextInput
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          value={email}
          handleChange={handleChangeEmail}
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
          {!loading && <FaArrowRight size={14} />}
        </SubmitButton>
      </StyledForm>
    </Container>
  );
};

export default ForgotPassword;
