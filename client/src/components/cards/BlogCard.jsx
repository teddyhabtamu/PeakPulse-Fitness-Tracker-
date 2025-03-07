import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${({ theme }) => theme.card_background};
  border: 1px solid ${({ theme }) => theme.border_color};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const Content = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Author = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
`;

const BlogCard = ({ post }) => {
  return (
    <Card>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <Author>By {post.author_name}</Author>
    </Card>
  );
};

export default BlogCard;
