import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaDumbbell,
  FaChartBar,
  FaBullseye,
  FaUsers,
  FaArrowRight,
  FaStar,
  FaQuoteLeft,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(1deg); }
  66% { transform: translateY(10px) rotate(-1deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 1; }
`;

const Container = styled.div`
  background: #FAFBFC;
  color: #0F172A;
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 5%;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);

  @media (max-width: 480px) {
    padding: 14px 4%;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 22px;
  font-weight: 800;
  color: #0F172A;
  letter-spacing: -0.5px;
`;

const LogoDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #174657, #00AEFF);
  box-shadow: 0 0 12px rgba(0, 174, 255, 0.3);
`;

const NavActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const LoginButton = styled.button`
  padding: 10px 24px;
  background: transparent;
  color: #0F172A;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #F1F5F9;
    border-color: #94A3B8;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

const SignupButton = styled.button`
  padding: 10px 24px;
  background: linear-gradient(135deg, #174657, #0F2C38);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(23, 70, 87, 0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(23, 70, 87, 0.35);
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 140px 5% 80px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(165deg, #F8FAFC 0%, #FFFFFF 40%, #F0F7FF 100%);
`;

const HeroBgOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
`;

const Orb1 = styled(HeroBgOrb)`
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 174, 255, 0.12), transparent 70%);
  top: -150px;
  right: -100px;
  animation: ${float} 8s ease-in-out infinite;
`;

const Orb2 = styled(HeroBgOrb)`
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 255, 157, 0.08), transparent 70%);
  bottom: -100px;
  left: -100px;
  animation: ${float} 10s ease-in-out infinite reverse;
`;

const Orb3 = styled(HeroBgOrb)`
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(23, 70, 87, 0.1), transparent 70%);
  top: 40%;
  left: 30%;
  animation: ${pulse} 6s ease-in-out infinite;
`;

const HeroInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;
  width: 100%;
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
    gap: 50px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  animation: ${fadeUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: linear-gradient(135deg, rgba(0, 174, 255, 0.1), rgba(0, 255, 157, 0.1));
  color: #174657;
  border-radius: 50px;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 28px;
  border: 1px solid rgba(0, 174, 255, 0.15);
  letter-spacing: 0.3px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.8rem, 5.5vw, 4.8rem);
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 1.2rem;
  line-height: 1.1;
  letter-spacing: -2px;

  .gradient {
    background: linear-gradient(135deg, #174657, #00AEFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .highlight {
    display: inline-block;
    position: relative;
    color: #0F172A;

    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 10px;
      background: linear-gradient(90deg, rgba(0, 174, 255, 0.2), rgba(0, 255, 157, 0.2));
      border-radius: 4px;
      z-index: -1;
    }
  }
`;

const HeroDescription = styled.p`
  font-size: 1.15rem;
  color: #64748B;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  max-width: 500px;

  @media (max-width: 968px) {
    margin: 0 auto 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 14px;

  @media (max-width: 968px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const MainCTA = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #174657, #0F2C38);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(23, 70, 87, 0.25);

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

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SecondaryCTA = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 600;
  background: white;
  color: #0F172A;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #174657;
    color: #174657;
    background: #F8FAFC;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 50px;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  font-size: 1.8rem;
  font-weight: 800;
  color: #0F172A;
  letter-spacing: -1px;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const StatLabel = styled.span`
  font-size: 0.85rem;
  color: #94A3B8;
  font-weight: 500;
  margin-top: 2px;
`;

const HeroImageWrapper = styled.div`
  flex: 1.1;
  position: relative;
  animation: ${fadeIn} 1.2s ease forwards;

  @media (max-width: 968px) {
    width: 90%;
    max-width: 500px;
  }
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2);
  background: #FFFFFF;
  height: 580px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(0, 174, 255, 0.3), rgba(0, 255, 157, 0.1));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 2;
  }

  @media (max-width: 968px) {
    height: 420px;
  }

  @media (max-width: 480px) {
    height: 320px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 24px;
`;

const FloatingBadge = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  font-size: 13px;
  font-weight: 600;
  color: #0F172A;
  z-index: 3;
  animation: ${float} 5s ease-in-out infinite;
  border: 1px solid rgba(226, 232, 240, 0.8);
`;

const Badge1 = styled(FloatingBadge)`
  top: 20px;
  left: -20px;

  @media (max-width: 968px) {
    left: 10px;
  }
`;

const Badge2 = styled(FloatingBadge)`
  bottom: 30px;
  right: -25px;
  animation-delay: 2s;

  @media (max-width: 968px) {
    right: 10px;
  }
`;

const BadgeDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color || "#00FF9D"};
  box-shadow: 0 0 8px ${({ color }) => color || "#00FF9D"}40;
`;

const FeaturesSection = styled.section`
  padding: 120px 5%;
  background: #FFFFFF;
  position: relative;

  @media (max-width: 600px) {
    padding: 70px 5%;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 70px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #174657;
  margin-bottom: 16px;
  display: block;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 1rem;
  letter-spacing: -1px;
`;

const SectionSubtitle = styled.p`
  font-size: 1.05rem;
  color: #94A3B8;
  line-height: 1.7;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: #FAFBFC;
  padding: 36px 32px;
  border-radius: 20px;
  border: 1px solid #F1F5F9;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #174657, #00AEFF);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-6px);
    background: #FFFFFF;
    box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.08);
    border-color: #E2E8F0;

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    padding: 28px 24px;
  }
`;

const FeatureIcon = styled.div`
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, rgba(23, 70, 87, 0.08), rgba(0, 174, 255, 0.08));
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #174657;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    background: linear-gradient(135deg, #174657, #0F2C38);
    color: white;
    box-shadow: 0 8px 20px rgba(23, 70, 87, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #0F172A;
`;

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  color: #64748B;
  line-height: 1.7;
  margin: 0;
`;

const ShowcaseSection = styled.section`
  padding: 100px 5%;
  background: #FFFFFF;
  overflow: hidden;

  @media (max-width: 600px) {
    padding: 60px 5%;
  }
`;

const ShowcaseGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ShowcaseLarge = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 480px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  @media (max-width: 768px) {
    height: 360px;
  }

  @media (max-width: 480px) {
    height: 260px;
  }
`;

const ShowcaseOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px 28px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

const ShowcaseTag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 6px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const ShowcaseTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 480px) {
    font-size: 17px;
  }
`;

const ShowcaseRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ShowcaseSmall = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 228px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const ShowcaseCard = styled.div`
  flex: 1;
  background: #FAFBFC;
  border: 1px solid #F1F5F9;
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

const ShowcaseCardIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(23, 70, 87, 0.08), rgba(0, 174, 255, 0.08));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #174657;
  font-size: 16px;
`;

const ShowcaseCardTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
`;

const ShowcaseCardText = styled.p`
  font-size: 14px;
  color: #64748B;
  line-height: 1.6;
  margin: 0;
`;

const TestimonialSection = styled.section`
  padding: 100px 5%;
  background: #F8FAFC;
  text-align: center;

  @media (max-width: 600px) {
    padding: 60px 5%;
  }
`;

const TestimonialCard = styled.div`
  max-width: 650px;
  margin: 0 auto;
  background: white;
  padding: 48px 40px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  border: 1px solid #F1F5F9;
  position: relative;

  @media (max-width: 600px) {
    padding: 32px 24px;
  }
`;

const QuoteIcon = styled.div`
  color: #174657;
  opacity: 0.1;
  font-size: 40px;
  margin-bottom: 16px;
`;

const TestimonialText = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  color: #475569;
  margin-bottom: 24px;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const AuthorAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #174657, #00AEFF);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
`;

const AuthorInfo = styled.div`
  text-align: left;
`;

const AuthorName = styled.div`
  font-weight: 700;
  color: #0F172A;
  font-size: 14px;
`;

const AuthorRole = styled.div`
  font-size: 12px;
  color: #94A3B8;
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-bottom: 20px;
  color: #F59E0B;
  font-size: 14px;
`;

const BottomCTASection = styled.section`
  padding: 120px 5%;
  background: linear-gradient(135deg, #0F172A 0%, #174657 50%, #0F2C38 100%);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 174, 255, 0.08), transparent 70%);
    top: -150px;
    right: -100px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 157, 0.06), transparent 70%);
    bottom: -80px;
    left: -80px;
  }
`;

const BottomCTAWrap = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const BottomCTATitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
  letter-spacing: -1px;
`;

const BottomCTADesc = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  max-width: 500px;
  line-height: 1.6;
`;

const LightButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 40px;
  background: white;
  color: #0F172A;
  border: none;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);

    svg {
      transform: translateX(4px);
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const Footer = styled.footer`
  background: #0F172A;
  color: #64748B;
  padding: 50px 5% 24px;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 28px;

  button {
    background: none;
    border: none;
    color: #94A3B8;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
    transition: color 0.2s ease;

    &:hover {
      color: white;
    }
  }

  @media (max-width: 600px) {
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialIcon = styled.a`
  width: 38px;
  height: 38px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateY(-2px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 13px;
  color: #475569;
  max-width: 1200px;
  margin: 0 auto;
`;

const Home = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Container>
      <Nav>
        <Logo onClick={() => navigate("/")}>
          <LogoDot />
          PeakPulse
        </Logo>
        <NavActions>
          <LoginButton onClick={() => navigate("/signin")}>Log In</LoginButton>
          <SignupButton onClick={() => navigate("/signup")}>Get Started</SignupButton>
        </NavActions>
      </Nav>

      <div id="hero"><HeroSection>
        <Orb1 />
        <Orb2 />
        <Orb3 />
        <HeroInner>
          <HeroContent>
            <Badge>
              <FaStar size={12} />
              New: Advanced Analytics
            </Badge>
            <HeroTitle>
              Data-Driven<br />
              <span className="gradient">Fitness Tracking</span><br />
              <span className="highlight">That Works</span>
            </HeroTitle>
            <HeroDescription>
              Stop guessing your progress. PeakPulse gives you precision tools to track, analyze, and optimize every workout. Real data, real results.
            </HeroDescription>
            <CTAContainer>
              <MainCTA onClick={() => navigate("/signup")}>
                Start Free Trial <FaArrowRight size={16} />
              </MainCTA>
              <SecondaryCTA onClick={() => navigate("/signin")}>
                Watch Demo
              </SecondaryCTA>
            </CTAContainer>
            <StatsContainer>
              <StatItem>
                <StatValue>10k+</StatValue>
                <StatLabel>Active Users</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>2M+</StatValue>
                <StatLabel>Workouts Logged</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>99%</StatValue>
                <StatLabel>Satisfaction</StatLabel>
              </StatItem>
            </StatsContainer>
          </HeroContent>
          <HeroImageWrapper>
            <ImageCard>
              <StyledImage src="/man-doing-sport.jpg" alt="Athlete training with PeakPulse" />
            </ImageCard>
            <Badge1>
              <BadgeDot color="#00FF9D" />
              <span>Real-time sync</span>
            </Badge1>
            <Badge2>
              <BadgeDot color="#00AEFF" />
              <span>Smart insights</span>
            </Badge2>
          </HeroImageWrapper>
        </HeroInner>
      </HeroSection></div>

      <div id="features"><FeaturesSection>
        <SectionHeader>
          <SectionLabel>Features</SectionLabel>
          <SectionTitle>Everything you need to succeed</SectionTitle>
          <SectionSubtitle>
            A comprehensive suite of tools designed to help you plan, track, and analyze every aspect of your fitness journey.
          </SectionSubtitle>
        </SectionHeader>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon><FaDumbbell /></FeatureIcon>
            <FeatureTitle>Precision Logging</FeatureTitle>
            <FeatureDescription>
              Record sets, reps, weight, and rest times with an interface designed for speed while you're at the gym.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon><FaChartBar /></FeatureIcon>
            <FeatureTitle>Advanced Analytics</FeatureTitle>
            <FeatureDescription>
              Visualize volume load, 1RM progression, and muscle group distribution over time with interactive charts.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon><FaBullseye /></FeatureIcon>
            <FeatureTitle>Goal Tracking</FeatureTitle>
            <FeatureDescription>
              Set specific targets for weight, frequency, or performance, and track your proximity to achieving them.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon><FaUsers /></FeatureIcon>
            <FeatureTitle>Community Driven</FeatureTitle>
            <FeatureDescription>
              Share routines, learn from others, and participate in community challenges to stay motivated.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection></div>

      <div id="showcase"><ShowcaseSection>
        <SectionHeader>
          <SectionLabel>Community</SectionLabel>
          <SectionTitle>Real People, Real Results</SectionTitle>
          <SectionSubtitle>
            Join a growing community of athletes and fitness enthusiasts who
            trust PeakPulse to elevate their training.
          </SectionSubtitle>
        </SectionHeader>
        <ShowcaseGrid>
          <ShowcaseLarge>
            <img
              src="/portrait-youg-afro-american-sports-man-doing-pushup-exercise.jpg"
              alt="Athlete doing pushups"
            />
            <ShowcaseOverlay>
              <ShowcaseTag>Strength Training</ShowcaseTag>
              <ShowcaseTitle>Track every rep, set, and pound</ShowcaseTitle>
            </ShowcaseOverlay>
          </ShowcaseLarge>
          <ShowcaseRight>
            <ShowcaseSmall>
              <img src="/download.jpg" alt="Workout tracking" />
              <ShowcaseOverlay>
                <ShowcaseTag>Analytics</ShowcaseTag>
                <ShowcaseTitle>Visualize your progress</ShowcaseTitle>
              </ShowcaseOverlay>
            </ShowcaseSmall>
            <ShowcaseCard>
              <ShowcaseCardIcon><FaCheckCircle /></ShowcaseCardIcon>
              <ShowcaseCardTitle>Built by athletes, for athletes</ShowcaseCardTitle>
              <ShowcaseCardText>
                From precision logging to advanced analytics — every feature is
                designed to help you push past plateaus and reach new personal
                bests.
              </ShowcaseCardText>
            </ShowcaseCard>
          </ShowcaseRight>
        </ShowcaseGrid>
      </ShowcaseSection></div>

      <div id="blog"><TestimonialSection>
        <SectionHeader style={{ marginBottom: 40 }}>
          <SectionLabel>Testimonials</SectionLabel>
          <SectionTitle>Loved by fitness enthusiasts</SectionTitle>
        </SectionHeader>
        <TestimonialCard>
          <QuoteIcon><FaQuoteLeft /></QuoteIcon>
          <Stars>{[...Array(5)].map((_, i) => <FaStar key={i} />)}</Stars>
          <TestimonialText>
            PeakPulse completely changed how I approach my workouts. The analytics helped me break through a plateau I'd been stuck on for months. The precision logging is incredibly fast — I can log an entire workout in under 30 seconds.
          </TestimonialText>
          <TestimonialAuthor>
            <AuthorAvatar>TH</AuthorAvatar>
            <AuthorInfo>
              <AuthorName>Tewodros Habtamu</AuthorName>
              <AuthorRole>Founder & Fitness Enthusiast</AuthorRole>
            </AuthorInfo>
          </TestimonialAuthor>
        </TestimonialCard>
      </TestimonialSection></div>

      <div id="pricing"><BottomCTASection>
        <BottomCTAWrap>
          <BottomCTATitle>Ready to transform your fitness journey?</BottomCTATitle>
          <BottomCTADesc>
            Join thousands of users who have transformed their approach to fitness. Setup takes less than 2 minutes. No credit card required.
          </BottomCTADesc>
          <LightButton onClick={() => navigate("/signup")}>
            Create your free account <FaArrowRight size={16} />
          </LightButton>
        </BottomCTAWrap>
      </BottomCTASection></div>

      <div id="contact"><Footer>
        <FooterContent>
          <FooterLogo>
            <LogoDot />
            PeakPulse
          </FooterLogo>
          <FooterLinks>
            <button onClick={() => scrollTo("features")}>Features</button>
            <button onClick={() => scrollTo("showcase")}>Gallery</button>
            <button onClick={() => scrollTo("pricing")}>Pricing</button>
            <button onClick={() => scrollTo("blog")}>Testimonials</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </FooterLinks>
          <SocialIcons>
            <SocialIcon href="https://twitter.com/TewodrosHa39695" target="_blank" rel="noopener noreferrer"><FaTwitter /></SocialIcon>
            <SocialIcon href="https://instagram.com/tedify19" target="_blank" rel="noopener noreferrer"><FaInstagram /></SocialIcon>
            <SocialIcon href="https://linkedin.com/in/tewodros-habtamu-831754351/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></SocialIcon>
          </SocialIcons>
        </FooterContent>
        <Copyright>
          &copy; {new Date().getFullYear()} PeakPulse. Designed by Tewodros Habtamu.
        </Copyright>
      </Footer></div>
    </Container>
  );
};

export default Home;
