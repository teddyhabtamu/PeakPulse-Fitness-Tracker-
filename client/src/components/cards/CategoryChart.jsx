import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

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
    box-shadow: 0px 15px 30px rgba(0, 255, 157, 0.15);
    border-color: ${({ theme }) => theme.primary + 50};
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

const CategoryChart = ({ data }) => {
  // Log data to verify its structure and contents
  console.log("Category Chart Data:", data);

  // Extract pieChartData from data (assuming it is structured correctly)
  const pieChartData = data?.weeklyStats.map((item) => ({
    value: item.calories_burned,
    label: `Week ${item.week}`,
  }));

  // Check if pieChartData is available
  const hasPieChartData = pieChartData && pieChartData.length > 0;

  return (
    <Card>
      <Title>Category Chart</Title>
      {hasPieChartData ? (
        <PieChart
          sx={{
            "& .MuiChartsLegend-series text": { fill: "#FFFFFF !important" },
          }}
          series={[
            {
              data: pieChartData,
              innerRadius: 20,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          height={300}
        />
      ) : (
        <div>No data available for pie chart.</div>
      )}
    </Card>
  );
};

export default CategoryChart;
