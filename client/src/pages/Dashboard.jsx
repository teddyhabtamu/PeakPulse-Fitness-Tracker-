import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import api from "../utils/api";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import { LinearProgress } from "@mui/material";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { FaDumbbell, FaWeightHanging, FaFire, FaRunning } from "react-icons/fa";

// ── Animations ──
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(0, 255, 157, 0.4); }
  70%  { box-shadow: 0 0 0 10px rgba(0, 255, 157, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 157, 0); }
`;

// ── Layout ──
const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 32px 0;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 0 24px;
  @media (max-width: 600px) {
    padding: 0 12px;
    gap: 16px;
  }
`;

// ── Page Header ──
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${fadeInUp} 0.5s ease;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  letter-spacing: -0.5px;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Greeting = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 400;
`;

// ── Stats Row (3 cards) ──
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  animation: ${fadeInUp} 0.6s ease;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// ── Goal Section ──
const GoalContainer = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 24px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "20"};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  animation: ${fadeInUp} 0.55s ease;
  margin-bottom: 8px;
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: center;
`;

const GoalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
`;

const GoalValue = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;

// ── Main Bento Grid ──
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 380px;
  grid-template-rows: auto;
  gap: 20px;
  animation: ${fadeInUp} 0.7s ease;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

// ── Section ──
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${fadeInUp} 0.8s ease;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const Badge = styled.span`
  background: ${({ theme }) => theme.primary + "20"};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
`;

const WorkoutsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 80px;
  animation: ${fadeInUp} 0.9s ease;
`;

// ── Empty State ──
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  border: 1px dashed ${({ theme }) => theme.text_secondary + "40"};
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  gap: 16px;
  grid-column: 1 / -1;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  animation: ${pulse} 2s infinite;
`;

// ── Loading ──
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  gap: 12px;
`;

const Spinner = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid ${({ theme }) => theme.text_secondary + "40"};
  border-top-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${Spinner} 0.8s linear infinite;
`;

// ── Error ──
const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: ${({ theme }) => theme.red};
  font-size: 16px;
  gap: 8px;
`;

const Dashboard = () => {
  const [data, setData] = useState({
    dailyStats: [],
    weeklyStats: [],
    workoutStats: [],
    workouts: [],
  });

  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [dashboardResponse, todaysWorkoutsResponse] = await Promise.all([
        api.get("/dashboard"),
        api.get("/todays-workouts"),
      ]);

      setData({
        dailyStats: dashboardResponse.data.dailyStats || [],
        weeklyStats: dashboardResponse.data.weeklyStats || [],
        workoutStats: dashboardResponse.data.workoutStats || [],
        workouts: dashboardResponse.data.workouts || [],
      });
      setTodaysWorkouts(todaysWorkoutsResponse.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        Loading dashboard...
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        ⚠️ Error: {error}
      </ErrorContainer>
    );
  }

  const countsCardItems = [
    {
      name: "Total Workouts",
      key: "totalWorkouts",
      unit: "workouts",
      desc: "Total workouts completed",
      color: "#FFFFFF",
      lightColor: "#00FF9D",
      icon: <FaDumbbell />,
      trendKey: "totalWorkouts",
    },
    {
      name: "Total Duration",
      key: "totalDuration",
      unit: "min",
      desc: "Total workout minutes",
      color: "#FFFFFF",
      lightColor: "#2D78D1",
      icon: <FaFire />,
      trendKey: "totalDuration",
    },
    {
      name: "Total Volume",
      key: "totalVolume",
      unit: "kg",
      desc: "Total weight lifted (sets × reps × weight)",
      color: "#FFFFFF",
      lightColor: "#E91E63",
      icon: <FaWeightHanging />,
      trendKey: "totalVolume",
    },
  ];

  const todaysDuration = todaysWorkouts.reduce((acc, w) => acc + (parseInt(w.duration) || 0), 0);
  const durationGoal = 60; // Goal is 60 minutes of workout per day
  const progressPercent = Math.min((todaysDuration / durationGoal) * 100, 100);

  return (
    <Container>
      <Wrapper>
        {/* ─── Page Header ─── */}
        <PageHeader>
          <div>
            <Title>Dashboard</Title>
            <Greeting>Here's your fitness overview</Greeting>
          </div>
        </PageHeader>

        {/* ─── Daily Goal ─── */}
        <GoalContainer>
          <GoalHeader>
            <GoalTitle>Daily Goal: 60 Mins Active</GoalTitle>
            <GoalValue>{todaysDuration} / {durationGoal} min</GoalValue>
          </GoalHeader>
          <LinearProgress 
            variant="determinate" 
            value={progressPercent} 
            sx={{ 
              height: 10, 
              borderRadius: 5, 
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': { backgroundColor: '#174657' } // use our new primary color
            }} 
          />
        </GoalContainer>

        {/* ─── Stats Row ─── */}
        <StatsGrid>
          {countsCardItems.map((item) => (
            <CountsCard key={item.key} item={item} data={data} trends={data.trends} />
          ))}
        </StatsGrid>

        {/* ─── Bento Grid: Charts + Form ─── */}
        {data && Object.keys(data).length > 0 && (
          <BentoGrid>
            <WeeklyStatCard data={data} />
            <CategoryChart data={data} />
            <AddWorkout onWorkoutAdded={fetchDashboardData} />
          </BentoGrid>
        )}

        {/* ─── Today's Workouts ─── */}
        <SectionHeader>
          <SectionTitle>Today's Workouts</SectionTitle>
          <Badge>{todaysWorkouts.length} logged</Badge>
        </SectionHeader>

        <WorkoutsGrid>
          {todaysWorkouts.length > 0 ? (
            todaysWorkouts.map((workout) => (
              <WorkoutCard key={workout.workout_id} workout={workout} />
            ))
          ) : (
            <EmptyState>
              <EmptyIcon><FaRunning /></EmptyIcon>
              <div style={{ fontWeight: 600 }}>No workouts yet today</div>
              <div style={{ fontSize: "14px", opacity: 0.7, maxWidth: "300px" }}>
                Add a new workout using the form above to start tracking your progress!
              </div>
            </EmptyState>
          )}
        </WorkoutsGrid>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
