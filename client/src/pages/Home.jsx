import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Header = styled.header`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.primary};
`;

const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 20px 0;
`;

const Image = styled.img`
  width: 300px;
  height: auto;
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AboutSection = styled.section`
  padding: 40px 20px;
  background: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  text-align: center;
`;

const AboutTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
`;

const AboutDescription = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Footer = styled.footer`
  padding: 20px;
  background: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  width: 100%;
`;

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin");
  };

  return (
    <Container>
      <Header>
        <Title>Welcome to PeakPulse</Title>
        <Description>Your ultimate fitness tracking companion.</Description>
        <Image src="/path/to/your/image.jpg" alt="Fitness" />
        <Button onClick={handleLoginClick}>Login</Button>
      </Header>
      <AboutSection>
        <AboutTitle>About Us</AboutTitle>
        <AboutDescription>
          At PeakPulse, we are dedicated to helping you achieve your fitness
          goals. Our platform provides comprehensive tracking, detailed
          statistics, and personalized workouts to ensure you stay on the right
          path. Join our community and take the first step towards a healthier,
          fitter you.
        </AboutDescription>
      </AboutSection>
      <Footer>
        &copy; {new Date().getFullYear()} PeakPulse. All rights reserved.
      </Footer>
    </Container>
  );
};

export default Home;
