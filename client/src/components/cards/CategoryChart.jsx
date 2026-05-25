import React, { useState, useEffect } from "react";
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
  align-items: center;
  gap: 6px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  touch-action: pan-y;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 30px rgba(0, 255, 157, 0.15);
    border-color: ${({ theme }) => theme.primary + 50};
  }

  .MuiChartsLegend-root text,
  .MuiChartsLegend-root tspan,
  .MuiChartsAxis-tickLabel {
    fill: ${({ theme }) => theme.text_secondary} !important;
  }

  .MuiChartsAxis-line,
  .MuiChartsAxis-tick {
    stroke: ${({ theme }) => theme.text_secondary}40 !important;
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

const COLORS = ["#00FF9D", "#B624FF", "#FF8C00", "#F2FF00", "#FF3366", "#00AEFF"];

const CategoryChart = ({ data }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 600;
  const isTablet = screenWidth <= 900;

  const outerRadius = isMobile ? 65 : isTablet ? 75 : 95;
  const chartHeight = isMobile ? 310 : isTablet ? 330 : 370;
  const chartMargin = { top: 10, right: 20, bottom: 120, left: 20 };

  const legendProps = {
    direction: "row",
    position: { vertical: "bottom", horizontal: "middle" },
    itemMarkWidth: isMobile ? 10 : 12,
    itemMarkHeight: isMobile ? 10 : 12,
    labelStyle: { fontSize: isMobile ? 11 : 12 },
  };

  const categoryCounts = {};
  (data?.workouts || []).forEach((w) => {
    const cat = w.category || "Other";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const pieChartData = Object.entries(categoryCounts).map(([label, value], i) => ({
    id: i,
    value,
    label,
    color: COLORS[i % COLORS.length],
  }));

  const hasPieChartData = pieChartData.length > 0;

  return (
    <Card>
      <Title>Workout Categories</Title>
      {hasPieChartData ? (
        <PieChart
          series={[
            {
              data: pieChartData,
              innerRadius: 20,
              outerRadius,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          height={chartHeight}
          margin={chartMargin}
          slotProps={{ legend: legendProps }}
        />
      ) : (
        <div style={{ color: "#AFAFB5", fontSize: 14, padding: "40px 0", textAlign: "center" }}>
          Add workouts to see category breakdown
        </div>
      )}
    </Card>
  );
};

export default CategoryChart;
