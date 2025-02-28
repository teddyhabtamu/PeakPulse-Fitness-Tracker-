import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeroImage from "../utils/Images/hero1.jpg";

const HeroSection = styled.div`
  min-height: 100vh; /* Use min-height instead of height */
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ContentSection = styled.div`
  padding: 6rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const ImageSection = styled.div`
  background: url(${HeroImage});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(9, 132, 227, 0.1),
      rgba(255, 255, 255, 0.1)
    );
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #2d3436;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  animation: fadeInUp 1s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  color: #0984e3;
  font-weight: 900;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #636e72;
  line-height: 1.8;
  margin-bottom: 2rem;
  animation: fadeInUp 1.2s ease-out;
`;

const CTAButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: #0984e3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;
  transition: all 0.3s ease;
  animation: fadeInUp 1.4s ease-out;

  &:hover {
    background: #0773c5;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(9, 132, 227, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  animation: fadeInUp 1.6s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureTitle = styled.h3`
  color: #2d3436;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #636e72;
  line-height: 1.6;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <ContentSection>
        <div>
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
        </div>

        <FeatureGrid>
          <FeatureCard>
            <FeatureTitle>Workout Tracking</FeatureTitle>
            <FeatureDescription>
              Log and monitor your daily exercises
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Progress Analytics</FeatureTitle>
            <FeatureDescription>
              Visualize your fitness journey
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Custom Workouts</FeatureTitle>
            <FeatureDescription>Personalized training plans</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Community Support</FeatureTitle>
            <FeatureDescription>
              Connect with fitness enthusiasts
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </ContentSection>
      <ImageSection />
    </HeroSection>
  );
};

export default Home;
