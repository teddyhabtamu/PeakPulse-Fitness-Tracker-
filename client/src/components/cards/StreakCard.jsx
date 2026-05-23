import React from "react";
import styled from "styled-components";
import { FaFire } from "react-icons/fa";

const Card = styled.div`
  flex: 1;
  min-width: 160px;
  padding: 20px 24px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 14px;
  background: linear-gradient(135deg, ${({ theme }) => theme.card}, ${({ theme }) => theme.card});
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 25px rgba(255, 107, 0, 0.15);
    border-color: #FF6B00;
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #FF6B00, #FF4500);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  flex-shrink: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const StreakValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #FF6B00;
  line-height: 1;
`;

const StreakLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 4px;
`;

const Longest = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.7;
  margin-top: 2px;
`;

const StreakCard = ({ current, longest }) => (
  <Card>
    <IconWrapper>
      <FaFire />
    </IconWrapper>
    <Info>
      <StreakValue>{current}</StreakValue>
      <StreakLabel>Day Streak</StreakLabel>
      <Longest>Best: {longest} days</Longest>
    </Info>
  </Card>
);

export default StreakCard;
