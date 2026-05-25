import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: auto;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 12px 12px;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 16px;
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: 600px) {
    gap: 20px;
    padding: 0 4px;
  }
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 40px 0 20px;
  animation: ${fadeInUp} 0.5s ease;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    gap: 24px;
    padding: 16px 0;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroBadge = styled.span`
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary}15;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 12px;
  line-height: 1.2;
  letter-spacing: -0.5px;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const HeroHighlight = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 24px;
  max-width: 500px;
`;

const HeroImageWrapper = styled.div`
  flex-shrink: 0;
  width: 320px;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 900px) {
    width: 100%;
    max-width: 320px;
    height: 280px;
  }
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  animation: ${fadeInUp} 0.6s ease;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.primary}40;
    box-shadow: 0 8px 20px ${({ theme }) => theme.shadow};
  }
`;

const InfoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary}12;
  flex-shrink: 0;
`;

const InfoContent = styled.div``;

const InfoLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const InfoValue = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding-bottom: 32px;
  animation: ${fadeInUp} 0.7s ease;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FormSection = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 32px;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 4px;
`;

const FormSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Input = styled.input`
  padding: 14px 16px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}60;
  }
`;

const TextArea = styled.textarea`
  padding: 14px 16px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;
  min-height: 140px;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
  line-height: 1.5;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}60;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.button_text_primary};
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.shadow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.green};
  background: ${({ theme }) => theme.green}12;
  border: 1px solid ${({ theme }) => theme.green}30;
`;

const SocialSection = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const SocialTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 8px;
`;

const SocialText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 24px;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.input_bg};
  border: 1px solid ${({ theme }) => theme.border};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary}50;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.shadow};
  }
`;

const QuickContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 28px;
`;

const QuickContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};

  svg {
    color: ${({ theme }) => theme.primary};
    flex-shrink: 0;
  }
`;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <Container>
      <Wrapper>
        <HeroSection>
          <HeroContent>
            <HeroBadge>Get in Touch</HeroBadge>
            <HeroTitle>
              Let's <HeroHighlight>Connect</HeroHighlight>
              <br />and Grow Together
            </HeroTitle>
            <HeroSubtitle>
              Have a question, feedback, or want to collaborate? We'd love to
              hear from you. Reach out and our team will get back to you
              promptly.
            </HeroSubtitle>
          </HeroContent>
          <HeroImageWrapper>
            <img src="/image.png" alt="Contact us" />
          </HeroImageWrapper>
        </HeroSection>

        <InfoRow>
          <InfoCard>
            <InfoIcon><FiMail size={20} /></InfoIcon>
            <InfoContent>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>hello@peakpulse.app</InfoValue>
            </InfoContent>
          </InfoCard>
          <InfoCard>
            <InfoIcon><FiPhone size={20} /></InfoIcon>
            <InfoContent>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>+1 (234) 567-890</InfoValue>
            </InfoContent>
          </InfoCard>
          <InfoCard>
            <InfoIcon><FiMapPin size={20} /></InfoIcon>
            <InfoContent>
              <InfoLabel>Location</InfoLabel>
              <InfoValue>San Francisco, CA</InfoValue>
            </InfoContent>
          </InfoCard>
        </InfoRow>

        <MainContent>
          <FormSection>
            <FormTitle>Send Us a Message</FormTitle>
            <FormSubtitle>Fill out the form and we'll respond within 24 hours.</FormSubtitle>
            <Form onSubmit={handleSubmit}>
              {sent && (
                <SuccessMessage>
                  <FiCheck size={18} />
                  Message sent successfully! We'll get back to you soon.
                </SuccessMessage>
              )}
              <InputGroup>
                <Field>
                  <Label>Name</Label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </Field>
                <Field>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Field>
              </InputGroup>
              <Field>
                <Label>Subject</Label>
                <Input
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Label>Message</Label>
                <TextArea
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </Field>
              <SubmitButton type="submit">
                <FiSend size={16} />
                Send Message
              </SubmitButton>
            </Form>
          </FormSection>

          <SocialSection>
            <SocialTitle>Follow Us</SocialTitle>
            <SocialText>
              Stay connected on social media for daily fitness tips, workout
              challenges, and community motivation.
            </SocialText>
            <SocialLinks>
              <SocialLink href="https://facebook.com" target="_blank" aria-label="Facebook">
                <FaFacebookF />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" aria-label="Instagram">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <FaLinkedinIn />
              </SocialLink>
            </SocialLinks>
            <QuickContactList>
              <QuickContactItem>
                <FiMail size={16} />
                support@peakpulse.app
              </QuickContactItem>
              <QuickContactItem>
                <FiPhone size={16} />
                +1 (234) 567-890
              </QuickContactItem>
              <QuickContactItem>
                <FiMapPin size={16} />
                San Francisco, California
              </QuickContactItem>
            </QuickContactList>
          </SocialSection>
        </MainContent>
      </Wrapper>
    </Container>
  );
};

export default Contact;
