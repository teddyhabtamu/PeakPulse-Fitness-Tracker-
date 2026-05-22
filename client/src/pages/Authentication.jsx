import React from "react";
import styled from "styled-components";
import LogoImage from "../utils/Images/Logo.png";
import AuthImage from "../utils/Images/AuthImage.jpg";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  position: relative;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 700px) {
    display: none;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, rgba(0, 255, 157, 0.3) 0%, rgba(182, 36, 255, 0.3) 100%);
    pointer-events: none;
  }
`;

const Logo = styled.img`
  position: absolute;
  width: 70px;
  top: 40px;
  left: 60px;
  z-index: 10;
  filter: drop-shadow(0px 0px 10px rgba(0, 255, 157, 0.8));
`;

const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.6;
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = ({ onLogin, formType }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Left>
        <Logo src={LogoImage} />
        <Image src={AuthImage} />
      </Left>
      <Right>
        {formType === "signin" ? (
          <>
            <SignIn onLogin={onLogin} />
            <Text>
              Don't have an account?{" "}
              <TextButton onClick={() => navigate("/signup")}>
                SignUp
              </TextButton>
            </Text>
          </>
        ) : (
          <>
            <SignUp onLogin={onLogin} />
            <Text>
              Already have an account?{" "}
              <TextButton onClick={() => navigate("/signin")}>
                SignIn
              </TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
};

export default Authentication;
