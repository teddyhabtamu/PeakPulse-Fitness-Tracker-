import React from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts/BarChart";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 18px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 30px rgba(182, 36, 255, 0.15);
    border-color: ${({ theme }) => theme.secondary + 50};
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const WeeklyStatCard = ({ data }) => {
  console.log("Weekly Stats Data:", data.weeklyStats);

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      {data?.weeklyStats && data.weeklyStats.length > 0 && (
        <BarChart
          sx={{
            "& .MuiChartsAxis-tickLabel": { fill: "#AFAFB5 !important" },
            "& .MuiChartsAxis-line": { stroke: "#AFAFB5 !important" },
            "& .MuiChartsAxis-tick": { stroke: "#AFAFB5 !important" },
          }}
          xAxis={[
            {
              scaleType: "band",
              data: data.weeklyStats.map((stat) => `Week ${stat.week}`),
            },
          ]}
          series={[
            { data: data.weeklyStats.map((stat) => stat.calories_burned) },
          ]}
          height={300}
        />
      )}
    </Card>
  );
};

export default WeeklyStatCard;
