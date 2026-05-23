import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import BlogCard from "../components/cards/BlogCard";
import BlogForm from "../components/BlogForm";
import Button from "../components/Button";
import api from "../utils/api";
import { FiPlus, FiSearch } from "react-icons/fi";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 32px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px;
  @media (max-width: 600px) {
    gap: 16px;
    padding: 0 16px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  animation: ${fadeInUp} 0.5s ease;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 800;
  margin: 0;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 14px 14px 44px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const BlogGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeInUp} 0.6s ease;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: ${({ theme }) => theme.card};
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: 16px;
  gap: 16px;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.text_primary};
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/blog");
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercasedQuery) ||
          post.content.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <Container>
      <Wrapper>
        <HeaderContainer>
          <HeaderTop>
            <TitleSection>
              <Title>Community Hub</Title>
              <Subtitle>Read stories, tips, and insights from the fitness community.</Subtitle>
            </TitleSection>
            <Button
              text="Write a Post"
              leftIcon={<FiPlus size={18} />}
              onClick={() => setShowForm(true)}
            />
          </HeaderTop>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
        </HeaderContainer>

        {showForm && (
          <BlogForm
            addPost={addPost}
            closeForm={() => setShowForm(false)}
            fetchBlogPosts={fetchBlogPosts}
          />
        )}

        {loading ? (
          <EmptyState>
            <p>Loading posts...</p>
          </EmptyState>
        ) : filteredPosts.length > 0 ? (
          <BlogGrid>
            {filteredPosts.map((post) => (
              <BlogCard key={post.post_id} post={post} />
            ))}
          </BlogGrid>
        ) : (
          <EmptyState>
            <h3>No posts found</h3>
            <p>
              {searchQuery
                ? "Try adjusting your search query."
                : "Be the first to share your fitness journey!"}
            </p>
          </EmptyState>
        )}
      </Wrapper>
    </Container>
  );
};

export default Blogs;
