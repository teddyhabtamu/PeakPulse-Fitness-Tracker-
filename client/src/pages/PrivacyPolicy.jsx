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

const PrivacyPolicy = () => {
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

        <Title>Privacy Policy</Title>
        <Updated>Last updated: May 25, 2026</Updated>

        <Section>
          <SectionTitle>1. Information We Collect</SectionTitle>
          <Paragraph>
            We collect information you provide when creating an account,
            including your name, email address, and workout data. We also collect
            usage data to improve our service.
          </Paragraph>
          <List>
            <ListItem>
              <strong>Account Information:</strong> Name, email address, and
              profile photo (if provided)
            </ListItem>
            <ListItem>
              <strong>Workout Data:</strong> Exercises, sets, reps, weights,
              duration, and other fitness metrics you log
            </ListItem>
            <ListItem>
              <strong>Usage Data:</strong> Pages visited, features used, and
              interaction patterns
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <Paragraph>We use your information to:</Paragraph>
          <List>
            <ListItem>Provide and maintain the App's functionality</ListItem>
            <ListItem>
              Generate analytics and insights about your workouts
            </ListItem>
            <ListItem>Send occasional service-related communications</ListItem>
            <ListItem>Improve and develop new features</ListItem>
            <ListItem>
              Ensure the security and integrity of our platform
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Data Sharing</SectionTitle>
          <Paragraph>
            We do not sell your personal data. We may share anonymized,
            aggregate data for analytical purposes. We may disclose information
            if required by law or to protect our rights.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>4. Data Storage & Security</SectionTitle>
          <Paragraph>
            Your data is stored securely using industry-standard encryption. We
            use Supabase for database hosting and storage. While we take
            reasonable measures to protect your data, no method of transmission
            over the Internet is 100% secure.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>5. Your Rights</SectionTitle>
          <Paragraph>You have the right to:</Paragraph>
          <List>
            <ListItem>Access your personal data</ListItem>
            <ListItem>Correct inaccurate data</ListItem>
            <ListItem>Delete your account and associated data</ListItem>
            <ListItem>Export your data</ListItem>
            <ListItem>Withdraw consent at any time</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>6. Cookies</SectionTitle>
          <Paragraph>
            We use essential cookies for authentication and service operation. We
            do not use third-party tracking cookies. You can control cookie
            settings through your browser.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. Third-Party Services</SectionTitle>
          <Paragraph>
            We use the following third-party services:
          </Paragraph>
          <List>
            <ListItem>
              <strong>Supabase</strong> — Database and storage hosting
            </ListItem>
            <ListItem>
              <strong>Google OAuth</strong> — Optional social login
            </ListItem>
            <ListItem>
              <strong>Brevo</strong> — Email delivery for password resets and
              notifications
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>8. Changes to This Policy</SectionTitle>
          <Paragraph>
            We may update this policy from time to time. Changes will be posted
            on this page with an updated revision date.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>9. Contact</SectionTitle>
          <Paragraph>
            For questions about this Privacy Policy, contact us at{" "}
            <strong>support@peakpulse.app</strong>.
          </Paragraph>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default PrivacyPolicy;
