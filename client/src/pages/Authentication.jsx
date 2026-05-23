import React from "react";
import styled, { keyframes } from "styled-components";
import HeroImage from "../utils/Images/hero3.png";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import { useNavigate } from "react-router-dom";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.bg};

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 1.1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #0F172A;

  @media (max-width: 800px) {
    display: none;
  }
`;

const LeftBgImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const LeftOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.6) 0%,
    rgba(23, 70, 87, 0.3) 50%,
    rgba(15, 23, 42, 0.7) 100%
  );
`;

const LeftContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 40px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
`;

const LogoDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #00AEFF;
  box-shadow: 0 0 12px rgba(0, 174, 255, 0.4);
`;

const BottomCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 28px;
  max-width: 400px;
`;

const Quote = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 16px;
  font-weight: 500;
`;

const QuoteAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorInitials = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #00AEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 12px;
`;

const AuthorName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`;

const AuthorTitle = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: ${({ theme }) => theme.bg};
  animation: ${fadeUp} 0.6s ease;

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const SwitchText = styled.div`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
`;

const SwitchLink = styled.span`
  color: #174657;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Authentication = ({ onLogin, formType }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <LeftPanel>
        <LeftBgImage src={HeroImage} alt="PeakPulse Dashboard" />
        <LeftOverlay />
        <LeftContent>
          <TopBar>
            <LogoDot />
            PeakPulse
          </TopBar>
          <BottomCard>
            <Quote>
              "The analytics completely changed how I train. I can see exactly what's working and what isn't. PeakPulse took my workouts to the next level."
            </Quote>
            <QuoteAuthor>
              <AuthorInitials>TH</AuthorInitials>
              <div>
                <AuthorName>Tewodros Habtamu</AuthorName>
                <AuthorTitle>Fitness Enthusiast</AuthorTitle>
              </div>
            </QuoteAuthor>
          </BottomCard>
        </LeftContent>
      </LeftPanel>

      <RightPanel>
        <FormCard>
          {formType === "signin" ? (
            <>
              <SignIn onLogin={onLogin} />
              <SwitchText>
                Don't have an account?{" "}
                <SwitchLink onClick={() => navigate("/signup")}>
                  Sign up
                </SwitchLink>
              </SwitchText>
            </>
          ) : formType === "signup" ? (
            <>
              <SignUp onLogin={onLogin} />
              <SwitchText>
                Already have an account?{" "}
                <SwitchLink onClick={() => navigate("/signin")}>
                  Sign in
                </SwitchLink>
              </SwitchText>
            </>
          ) : formType === "forgot-password" ? (
            <>
              <ForgotPassword />
              <SwitchText>
                <SwitchLink onClick={() => navigate("/signin")}>
                  Back to sign in
                </SwitchLink>
              </SwitchText>
            </>
          ) : formType === "reset-password" ? (
            <>
              <ResetPassword />
              <SwitchText>
                <SwitchLink onClick={() => navigate("/signin")}>
                  Back to sign in
                </SwitchLink>
              </SwitchText>
            </>
          ) : null}
        </FormCard>
      </RightPanel>
    </Container>
  );
};

export default Authentication;
