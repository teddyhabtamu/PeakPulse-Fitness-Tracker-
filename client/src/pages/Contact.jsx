import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as PhoneIcon } from "../utils/icons/PhoneIcon.svg";
import { ReactComponent as FacebookIcon } from "../utils/icons/FacebookIcon.svg";
import { ReactComponent as TwitterIcon } from "../utils/icons/TwitterIcon.svg";
import { ReactComponent as InstagramIcon } from "../utils/icons/InstagramIcon.svg";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0px 16px;
  margin-top: 100px;
  font-size: 25px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 800;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 22px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 90%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4);
`;

const TextArea = styled.textarea`
  padding: 16px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 40};
  border-radius: 12px;
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  resize: none;
  height: 150px;
  outline: none;
  transition: all 0.3s ease;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.primary + 20};
  }
`;

const Input = styled.input`
  padding: 16px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 40};
  border-radius: 12px;
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  transition: all 0.3s ease;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.primary + 20};
  }
`;

const Button = styled.button`
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  color: #09090E;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 255, 157, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 10px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 15px 20px rgba(0, 255, 157, 0.4);
  }
`;

const ContactGrid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  padding: 0px 16px;
`;

const ContactCard = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 80%;
  max-width: 300px;
  padding: 20px;
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 18px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 30px rgba(182, 36, 255, 0.15);
    border-color: ${({ theme }) => theme.secondary + 50};
  }
`;

const Icon = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.primary};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ContactInfo = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
`;

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setFullName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact Us</Title>
        <Content>
          <ContactGrid>
            <ContactCard href="tel:+1234567890">
              <Icon>
                <PhoneIcon />
              </Icon>
              <ContactInfo>Phone</ContactInfo>
            </ContactCard>
            <ContactCard
              href="https://www.facebook.com/your-profile"
              target="_blank"
            >
              <Icon>
                <FacebookIcon />
              </Icon>
              <ContactInfo>Facebook</ContactInfo>
            </ContactCard>
            <ContactCard
              href="https://twitter.com/your-profile"
              target="_blank"
            >
              <Icon>
                <TwitterIcon />
              </Icon>
              <ContactInfo>Twitter</ContactInfo>
            </ContactCard>
            <ContactCard
              href="https://www.instagram.com/your-profile"
              target="_blank"
            >
              <Icon>
                <InstagramIcon />
              </Icon>
              <ContactInfo>Instagram</ContactInfo>
            </ContactCard>
          </ContactGrid>
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <TextArea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit">Send Message</Button>
            </Form>
          </FormContainer>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Contact;
