import React, { useState } from "react";
import styled from "styled-components";
import { FiClock, FiCalendar, FiChevronDown, FiChevronUp } from "react-icons/fi";

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary}40;
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 2px;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const CategoryTag = styled.div`
  padding: 4px 12px;
  background: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  line-height: 1.4;
`;

const Content = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin: 0;
  display: ${({ expanded }) => (expanded ? "block" : "-webkit-box")};
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "unset" : "3")};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const BlogCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  // Fallbacks for missing data
  const authorName = post.author_name || "Anonymous";
  const initials = authorName.charAt(0).toUpperCase();
  const date = post.created_at ? new Date(post.created_at).toLocaleDateString() : "Just now";
  
  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Card>
      <Header>
        <AuthorSection>
          <Avatar>{initials}</Avatar>
          <AuthorInfo>
            <AuthorName>{authorName}</AuthorName>
            <MetaInfo>
              <span><FiCalendar size={12} /> {date}</span>
              <span>•</span>
              <span><FiClock size={12} /> {readTime} min read</span>
            </MetaInfo>
          </AuthorInfo>
        </AuthorSection>
        <CategoryTag>Fitness</CategoryTag>
      </Header>
      
      <Title>{post.title}</Title>
      
      <Content expanded={expanded}>
        {post.content}
      </Content>
      
      {wordCount > 30 && (
        <ReadMoreBtn onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "Read More"}
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </ReadMoreBtn>
      )}
    </Card>
  );
};

export default BlogCard;
