import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px 80px;
`;

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  letter-spacing: -0.5px;
`;

const LogoDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 0 12px ${({ theme }) => theme.primary}40;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 8px;
  letter-spacing: -0.5px;
`;

const Updated = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 32px;
`;

const Section = styled.div`
  margin-bottom: 28px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 10px;
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 12px;
`;

const List = styled.ul`
  margin: 8px 0 12px;
  padding-left: 24px;
`;

const ListItem = styled.li`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
`;

const BackButton = styled.button`
  padding: 10px 24px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.button_text_primary};
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.shadow};
  }
`;

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Header>
          <Logo onClick={() => navigate("/")}>
            <LogoDot />
            PeakPulse
          </Logo>
          <div style={{ flex: 1 }} />
          <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
        </Header>

        <Title>Terms of Service</Title>
        <Updated>Last updated: May 25, 2026</Updated>

        <Section>
          <SectionTitle>1. Acceptance of Terms</SectionTitle>
          <Paragraph>
            By accessing or using PeakPulse ("the App"), you agree to be bound by
            these Terms of Service. If you do not agree, do not use the App.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. Description of Service</SectionTitle>
          <Paragraph>
            PeakPulse is a fitness tracking application that allows users to log
            workouts, track progress, set goals, and engage with a community of
            fitness enthusiasts. The App is provided "as is" without any
            warranties.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>3. User Accounts</SectionTitle>
          <Paragraph>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities under your account. You
            must provide accurate information and keep it updated.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>4. Acceptable Use</SectionTitle>
          <Paragraph>You agree not to:</Paragraph>
          <List>
            <ListItem>Use the App for any unlawful purpose</ListItem>
            <ListItem>Impersonate any person or entity</ListItem>
            <ListItem>
              Interfere with the proper operation of the App
            </ListItem>
            <ListItem>
              Upload or transmit viruses, malware, or harmful code
            </ListItem>
            <ListItem>
              Attempt to access another user's account without permission
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Intellectual Property</SectionTitle>
          <Paragraph>
            The App, its design, logos, and all content are the property of
            PeakPulse and are protected by applicable copyright and trademark
            laws. You may not reproduce, distribute, or create derivative works
            without our prior written consent.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>6. Limitation of Liability</SectionTitle>
          <Paragraph>
            PeakPulse shall not be liable for any indirect, incidental, special,
            or consequential damages arising from your use of the App. Your use
            of the App is at your own risk.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. Changes to Terms</SectionTitle>
          <Paragraph>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting. Your continued use of the App
            after changes constitutes acceptance of the new terms.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>8. Contact</SectionTitle>
          <Paragraph>
            For questions about these Terms, contact us at{" "}
            <strong>support@peakpulse.app</strong>.
          </Paragraph>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default TermsOfService;
