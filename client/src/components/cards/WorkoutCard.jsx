import React from "react";
import styled from "styled-components";
import { FiActivity, FiClock, FiTarget } from "react-icons/fi";

const Card = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0px 4px 12px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 12px 24px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary}40;

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const Category = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary}15;
  padding: 4px 10px;
  border-radius: 8px;
`;

const VolumeBadge = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 4px 8px;
  border-radius: 8px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  background: ${({ theme }) => theme.border};
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Stat = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const WorkoutCard = ({ workout }) => {
  const sets = parseInt(workout.sets) || 0;
  const reps = parseInt(workout.reps) || 0;
  const weight = parseFloat(workout.weight) || 0;
  const volume = sets * reps * weight;

  return (
    <Card>
      <HeaderRow>
        <Category>{workout.category}</Category>
        {volume > 0 && <VolumeBadge>{volume.toLocaleString()} kg total</VolumeBadge>}
      </HeaderRow>
      
      <ContentArea>
        <Name>{workout.workout_name}</Name>
        <Sets>{sets} sets × {reps} reps</Sets>
      </ContentArea>
      
      <Divider />
      
      <StatsRow>
        <Stat>
          <FiTarget size={16} />
          {workout.weight} kg
        </Stat>
        <Stat>
          <FiClock size={16} />
          {workout.duration} min
        </Stat>
      </StatsRow>
    </Card>
  );
};

export default WorkoutCard;
