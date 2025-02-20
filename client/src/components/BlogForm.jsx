import React, { useState } from "react";
import styled from "styled-components";

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
  gap: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.card_background};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  max-height: 90%;
  overflow-y: auto;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.border_color};
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.border_color};
  border-radius: 4px;
  resize: none;
  height: 400px;
`;

const Button = styled.button`
  padding: 10px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.button_text};
  background-color: ${({ theme }) => theme.button_background};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.button_hover};
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.cancel_button_background};
  &:hover {
    background-color: ${({ theme }) => theme.cancel_button_hover};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BlogForm = ({ addPost, closeForm }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addPost({ title, content });
      setTitle("");
      setContent("");
      closeForm();
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
          <Button type="submit">Submit</Button>
          <CancelButton type="button" onClick={closeForm}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default BlogForm;
