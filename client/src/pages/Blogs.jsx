import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BlogCard from "../components/cards/BlogCard";
import BlogForm from "../components/BlogForm";
import api from "../utils/api";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.background};
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
    padding: 0 16px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
`;

const ToggleButton = styled.button`
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 700;
  color: #09090E;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 100;
  box-shadow: 0px 8px 15px rgba(0, 255, 157, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 15px 20px rgba(0, 255, 157, 0.4);
  }
`;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch blog posts from the backend
  const fetchBlogPosts = async () => {
    try {
      const response = await api.get("/blog");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  // Fetch blog posts when the component mounts
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Add a new blog post to the state
  const addPost = (post) => {
    setPosts([post, ...posts]); // Add the new post to the beginning of the list
  };

  return (
    <Container>
      <Wrapper>
        <Title>Fitness Blog</Title>
        <ToggleButton onClick={() => setShowForm(true)}>
          Post a Blog
        </ToggleButton>
        {showForm && (
          <BlogForm
            addPost={addPost}
            closeForm={() => setShowForm(false)}
            fetchBlogPosts={fetchBlogPosts}
          />
        )}
        {posts.map((post) => (
          <BlogCard key={post.post_id} post={post} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Blogs;
