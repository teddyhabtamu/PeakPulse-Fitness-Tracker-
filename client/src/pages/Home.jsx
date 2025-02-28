import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeroImage from "../utils/Images/hero3.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  width: 100%;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Logo = styled.h1`
  color: #174657;
  font-size: 1.8rem;
  cursor: pointer;
`;
const Span = styled.h1`
  color: #00aeff;
  display: inline;
  font-size: 1.8rem;
`;

const StartButton = styled.button`
  padding: 0.8rem 2rem;
  background: #174657;
  color: white;
  border: none;
  width: 400px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #1e607a;
  }
`;

const LoginButton = styled.button`
  padding: 0.8rem 2rem;
  background: #174657;
  color: white;
  border: none;
  width: 140px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #1e607a;
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 5%;
  margin-top: 60px;
  background: #f8f9fa;
  position: relative;

  @media (max-width: 768px) {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.85);
      z-index: 1;
    }
  }
`;

const SpanHero = styled.h1`
  color: rgb(0, 174, 255);
  display: inline;
  font-size: 3.5rem;
`;

const HeroContent = styled.div`
  flex: 1;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #174657;
  margin-bottom: 1.5rem;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: hsl(196, 58.2%, 21.6%);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  padding: 1.5rem 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  background: #174657;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background: #1e607a;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const HeroImageWrapper = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    z-index: 0;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  padding: 0 5%;
`;

const FeatureCard = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(54, 80, 114, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background: #f8f9fa;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ff9f43;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #174657;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #174657;
`;

const AboutSection = styled.section`
  padding: 5rem 5%;
  background: #f8f9fa;
  color: #174657;
  text-align: center;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const SocialIcon = styled.a`
  font-size: 1.8rem;
  color: #174657;
  transition: color 0.3s ease;

  &:hover {
    color: #1e607a;
  }
`;

const Footer = styled.footer`
  background: #2d3436;
  color: white;
  text-align: center;
  padding: 1.5rem;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Nav>
        <Logo>
          Peak <Span>Pulse</Span>
        </Logo>
        <LoginButton onClick={() => navigate("/signin")}>LogIn</LoginButton>
      </Nav>

      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Transform Your <SpanHero>Fitness</SpanHero> Journey
          </HeroTitle>
          <HeroDescription>
            Experience the next level of fitness tracking with PeakPulse. Your
            personal fitness companion for achieving your goals.
          </HeroDescription>
          <CTAButton onClick={() => navigate("/signin")}>
            Start Your Journey
          </CTAButton>
        </HeroContent>
        <HeroImageWrapper>
          <StyledImage src={HeroImage} alt="Fitness" />
        </HeroImageWrapper>
      </HeroSection>

      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>💪</FeatureIcon>
          <FeatureTitle>Workout Tracking</FeatureTitle>
          <FeatureDescription>
            Log and monitor your daily exercises with ease.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>📊</FeatureIcon>
          <FeatureTitle>Progress Analytics</FeatureTitle>
          <FeatureDescription>
            Visualize your fitness journey with detailed analytics.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🎯</FeatureIcon>
          <FeatureTitle>Custom Workouts</FeatureTitle>
          <FeatureDescription>
            Personalized training plans tailored to your goals.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>👥</FeatureIcon>
          <FeatureTitle>Community Support</FeatureTitle>
          <FeatureDescription>
            Connect with fitness enthusiasts worldwide.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>

      <AboutSection>
        <h2>About PeakPulse</h2>
        <p>
          Your ultimate fitness companion for tracking, analyzing, and achieving
          your fitness goals.
        </p>
        <SocialIcons>
          <SocialIcon href="https://www.instagram.com/tedify19">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="https://x.com/TewodrosHa39695">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/tewodros-habtamu-831754351/">
            <FaLinkedin />
          </SocialIcon>
        </SocialIcons>
      </AboutSection>

      <Footer>
        <p>
          © {new Date().getFullYear()} PeakPulse. All Rights Reserved | Tewodros
          Habtamu
        </p>
      </Footer>
    </>
  );
};

export default Home;
