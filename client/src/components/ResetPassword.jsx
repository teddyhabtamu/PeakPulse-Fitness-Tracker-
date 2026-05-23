import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/api";
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

const BackLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  align-self: center;
  transition: color 0.2s ease;
  font-family: inherit;

  &:hover {
    color: #174657;
  }
`;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeConfirm = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, password);
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
          <Title>Password reset</Title>
          <Subtitle>
            Your password has been reset successfully.
          </Subtitle>
        </Header>
        <SuccessMsg>
          <FaCheckCircle size={16} />
          Password updated successfully
        </SuccessMsg>
        <BackLink onClick={() => navigate("/signin")}>
          Back to sign in
        </BackLink>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Set new password</Title>
        <Subtitle>
          Enter your new password below
        </Subtitle>
      </Header>
      <StyledForm onSubmit={handleSubmit}>
        <TextInput
          label="New Password"
          placeholder="Enter new password"
          password
          value={password}
          handleChange={handleChangePassword}
          autoComplete="off"
        />
        <TextInput
          label="Confirm Password"
          placeholder="Confirm new password"
          password
          value={confirmPassword}
          handleChange={handleChangeConfirm}
          autoComplete="off"
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
          {!loading && <FaArrowRight size={14} />}
        </SubmitButton>
      </StyledForm>
    </Container>
  );
};

export default ResetPassword;
