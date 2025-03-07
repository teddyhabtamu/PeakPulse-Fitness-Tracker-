import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const BlogPost = styled.div`
  background-color: ${({ theme }) => theme.card_background};
  border: 1px solid ${({ theme }) => theme.border_color};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BlogTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const BlogContent = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const BlogAuthor = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
`;

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blog");
        setBlogPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <BlogContainer>
      {blogPosts.map((post) => (
        <BlogPost key={post.post_id}>
          <BlogTitle>{post.title}</BlogTitle>
          <BlogContent>{post.content}</BlogContent>
          <BlogAuthor>By {post.author_name}</BlogAuthor>
        </BlogPost>
      ))}
    </BlogContainer>
  );
};

export default BlogList;
