import React from "react";
import styled from "styled-components";
import { FaTrophy } from "react-icons/fa";

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 25px rgba(255, 215, 0, 0.1);
    border-color: #FFD700;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const Icon = styled.div`
  color: #FFD700;
  font-size: 16px;
`;

const ExerciseName = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;
`;

const Label = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Value = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Highlight = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #FFD700;
`;

const PersonalRecordCard = ({ pr }) => (
  <Card>
    <Header>
      <Icon><FaTrophy /></Icon>
      <ExerciseName>{pr.workout_name}</ExerciseName>
    </Header>
    <StatRow>
      <Label>Est. 1RM</Label>
      <Highlight>{pr.estimated_1rm} kg</Highlight>
    </StatRow>
    <StatRow>
      <Label>Best Weight</Label>
      <Value>{pr.best_weight} kg</Value>
    </StatRow>
    <StatRow>
      <Label>Best Reps</Label>
      <Value>{pr.best_reps}</Value>
    </StatRow>
    <StatRow>
      <Label>Category</Label>
      <Value>{pr.category}</Value>
    </StatRow>
  </Card>
);

export default PersonalRecordCard;
