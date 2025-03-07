import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background-color: ${({ theme }) => theme.card_background || "#ffffff"};
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  max-height: 90%;
  overflow-y: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.border_color || "#ddd"};
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.button_background || "#007bff"};
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.border_color || "#ddd"};
  border-radius: 8px;
  resize: none;
  height: 400px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.button_background || "#007bff"};
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  color: ${({ theme }) => theme.button_text || "#ffffff"};
  background-color: ${({ theme }) => theme.button_background || "#007bff"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.button_hover || "#0056b3"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) =>
    theme.cancel_button_background || "#6c757d"};
  &:hover {
    background-color: ${({ theme }) => theme.cancel_button_hover || "#5a6268"};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const BlogForm = ({ closeForm, fetchBlogPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create a blog post");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/blog`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Blog post created successfully");
        setTitle("");
        setContent("");
        closeForm();
        fetchBlogPosts(); // Refresh the blog list
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Failed to create blog post");
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonGroup>
          <CancelButton type="button" onClick={closeForm}>
            Cancel
          </CancelButton>
          <Button type="submit">Submit</Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default BlogForm;
