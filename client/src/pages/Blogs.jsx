import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BlogCard from "../components/cards/BlogCard";
import BlogForm from "../components/BlogForm";
import axios from "axios"; // Import axios for API requests

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
  padding: 10px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.button_text};
  background-color: ${({ theme }) => theme.button_background};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: fixed;
  top: 100px; /* Adjusted to be below the nav bar */
  right: 20px;
  z-index: 100;
  &:hover {
    background-color: ${({ theme }) => theme.button_hover};
  }
`;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch blog posts from the backend
  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blog`);
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
            fetchBlogPosts={fetchBlogPosts} // Pass fetchBlogPosts to refresh the list
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
