import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Card = styled.div`
  padding: 28px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "20"};
  border-radius: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ accentColor }) => accentColor || "#00FF9D"},
      ${({ theme }) => theme.secondary}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 12px 30px rgba(0, 255, 157, 0.12);
    border-color: ${({ theme }) => theme.primary + "40"};

    &::before {
      opacity: 1;
    }
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Value = styled.div`
  font-weight: 700;
  font-size: 36px;
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1;
`;

const Unit = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const Trend = styled.span`
  font-weight: 600;
  font-size: 13px;
  padding: 3px 8px;
  border-radius: 8px;
  ${({ positive, theme }) =>
    positive
      ? `
    color: ${theme.green};
    background: ${theme.green + "18"};
  `
      : `
    color: ${theme.red};
    background: ${theme.red + "18"};
  `}
`;

const IconContainer = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 24px;
  flex-shrink: 0;
  ${({ color, bg }) => `
    background: ${bg + "22"};
    color: ${color};
    border: 1px solid ${bg + "30"};
  `}
`;

const Desc = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 4px;
`;

const CountsCard = ({ item, data }) => {
  const formatNumber = (number) => {
    if (number !== undefined && number !== null) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "0";
  };

  let value = 0;
  switch (item.key) {
    case "totalCaloriesBurnt":
      value = data.dailyStats.reduce(
        (acc, stat) => acc + stat.calories_burned,
        0
      );
      break;
    case "totalWorkouts":
      value = data.workoutStats.length;
      break;
    case "avgCaloriesBurntPerWorkout":
      const totalCalories = data.workoutStats.reduce(
        (acc, stat) => acc + stat.calories_burned,
        0
      );
      const totalWorkouts = data.workoutStats.length;
      value = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;
      break;
    default:
      value = 0;
      break;
  }

  return (
    <Card accentColor={item.lightColor}>
      <Left>
        <Title>{item.name}</Title>
        <Value>
          {formatNumber(value)}
          <Unit>{item.unit}</Unit>
        </Value>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Trend positive>+10%</Trend>
          <Desc>{item.desc}</Desc>
        </div>
      </Left>
      <IconContainer color={item.color} bg={item.lightColor}>
        {item.icon}
      </IconContainer>
    </Card>
  );
};

export default CountsCard;
