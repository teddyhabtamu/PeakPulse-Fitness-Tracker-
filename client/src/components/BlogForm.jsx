import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import api from "../utils/api";
import Button from "./Button";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: ${fadeIn} 0.2s ease;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 600px) {
    padding: 20px;
    width: 95%;
  }
`;

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Input = styled.input`
  padding: 14px 16px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
    background-color: ${({ theme }) => theme.bgLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}80;
  }
`;

const TextArea = styled.textarea`
  padding: 16px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;
  min-height: 200px;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
  line-height: 1.5;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
    background-color: ${({ theme }) => theme.bgLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}80;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
`;

const Message = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background: ${({ type, theme }) => (type === "error" ? theme.red + "15" : theme.green + "15")};
  color: ${({ type, theme }) => (type === "error" ? theme.red : theme.green)};
  border: 1px solid ${({ type, theme }) => (type === "error" ? theme.red + "30" : theme.green + "30")};
`;

const BlogForm = ({ closeForm, fetchBlogPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage({ text: "Both Title and Content are required.", type: "error" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });
      
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage({ text: "You must be logged in to create a post.", type: "error" });
        return;
      }

      const response = await api.post("/blog", { title, content });

      if (response.status === 201) {
        setMessage({ text: "Blog post published successfully!", type: "success" });
        setTitle("");
        setContent("");
        fetchBlogPosts(); // Refresh list immediately behind modal
        setTimeout(() => {
          closeForm();
        }, 1500); // Close automatically after showing success msg
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      setMessage({ text: "Failed to create blog post. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Close when clicking overlay (outside the form)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeForm();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <FormContainer onSubmit={handleSubmit}>
        <FormHeader>
          <Title>Write a Post</Title>
          <Subtitle>Share your fitness journey, a workout routine, or a healthy recipe.</Subtitle>
        </FormHeader>

        {message.text && <Message type={message.type}>{message.text}</Message>}

        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="e.g., My 30-Day Transformation Journey"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label>Story Content</Label>
          <TextArea
            placeholder="Tell your story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
        </FormGroup>

        <ButtonGroup>
          <Button 
            text="Cancel" 
            outlined 
            onClick={closeForm} 
            isDisabled={loading} 
            type="button" 
          />
          <Button 
            text={loading ? "Publishing..." : "Publish Post"} 
            isLoading={loading} 
            type="submit"
            onClick={handleSubmit}
          />
        </ButtonGroup>
      </FormContainer>
    </Overlay>
  );
};

export default BlogForm;
