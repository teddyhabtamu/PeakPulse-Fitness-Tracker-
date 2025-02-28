import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import HeroImage from "../utils/Images/hero3.png"; // Replace with your hero image path

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled Components
const HeroSection = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${HeroImage});
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 2rem;
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 1s ease-out;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  color: #ff9f43;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1.2s ease-out;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  background:rgb(67, 127, 255);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 1.4s ease-out;

  &:hover {
    background:rgb(0, 132, 255);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 159, 67, 0.3);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${scaleIn} 0.6s ease-out;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ff9f43;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <ContentSection>
        <Title>
          Transform Your Fitness Journey with <Highlight>PeakPulse</Highlight>
        </Title>
        <Description>
          Track your workouts, analyze your progress, and achieve your fitness
          goals with our comprehensive fitness tracking platform.
        </Description>
        <CTAButton onClick={() => navigate("/signin")}>
          Start Your Journey
        </CTAButton>

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
      </ContentSection>
    </HeroSection>
  );
};

export default Home;
