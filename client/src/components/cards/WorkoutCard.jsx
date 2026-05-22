import FitnessCenterRounded from "@mui/icons-material/FitnessCenterRounded";
import TimelapseRounded from "@mui/icons-material/TimelapseRounded";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 20px 24px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "20"};
  border-radius: 20px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 12px;
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
      ${({ theme }) => theme.secondary},
      ${({ theme }) => theme.primary}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 12px 30px rgba(182, 36, 255, 0.12);
    border-color: ${({ theme }) => theme.secondary + "40"};

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Category = styled.div`
  width: fit-content;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + "18"};
  padding: 5px 12px;
  border-radius: 20px;
`;

const Name = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
  letter-spacing: -0.3px;
`;

const Sets = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 400;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.text_secondary + "20"};
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
`;

const Details = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: ${({ theme }) => theme.primary};
  }
`;

const WorkoutCard = ({ workout }) => {
  return (
    <Card>
      <Category>{workout.category}</Category>
      <Name>{workout.workout_name}</Name>
      <Sets>
        {workout.sets} sets × {workout.reps} reps
      </Sets>
      <Divider />
      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: "18px" }} />
          {workout.weight} kg
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: "18px" }} />
          {workout.duration} min
        </Details>
      </Flex>
    </Card>
  );
};

export default WorkoutCard;
