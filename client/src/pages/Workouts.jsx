import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import api from "../utils/api";
import WorkoutCard from "../components/cards/WorkoutCard";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import dayjs from "dayjs";
import { FiChevronLeft, FiChevronRight, FiActivity, FiClock, FiTarget, FiDownload, FiTrendingUp } from "react-icons/fi";
import { LineChart } from "@mui/x-charts/LineChart";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 32px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1200px;
  display: flex;
  gap: 24px;
  padding: 0px 24px;
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 0px 16px;
  }
`;

// --- Custom Date Picker ---
const LeftSide = styled.div`
  flex: 0 0 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeInUp} 0.4s ease;

  @media (max-width: 800px) {
    flex: 1;
  }
`;

const CalendarCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};

  @media (max-width: 800px) {
    padding: 16px;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MonthTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const NavIcon = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primary}15;
    color: ${({ theme }) => theme.primary};
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
  text-align: center;
`;

const DayLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayCell = styled.button`
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  background: ${({ selected, isToday, theme }) => 
    selected ? theme.primary : 
    isToday ? theme.primary + "15" : "transparent"};
  color: ${({ selected, isToday, theme }) => 
    selected ? "#FFF" : 
    isToday ? theme.primary : theme.text_primary};
  font-weight: ${({ selected, isToday }) => (selected || isToday ? "700" : "500")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? "1" : "0.3")};

  &:hover {
    background: ${({ selected, theme }) => selected ? theme.primary : theme.primary + "20"};
    color: ${({ selected, theme }) => selected ? "#FFF" : theme.primary};
  }

  @media (max-width: 800px) {
    font-size: 12px;
  }
`;

// --- Right Side ---
const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeInUp} 0.5s ease;

  @media (max-width: 600px) {
    gap: 16px;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
`;

// --- Summary Bar ---
const SummaryBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
`;

const SummaryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ color, theme }) => color + "15"};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const SummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SummaryLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SummaryValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

// --- Filters & Grid ---
const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ active, theme }) => active ? theme.primary : theme.card};
  color: ${({ active, theme }) => active ? "#FFF" : theme.text_secondary};
  border: 1px solid ${({ active, theme }) => active ? theme.primary : theme.border};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ active, theme }) => active ? "#FFF" : theme.primary};
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

// --- Progress Modal ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeInUp} 0.2s ease;
`;

const ModalCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 24px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primary}15;
    color: ${({ theme }) => theme.primary};
  }
`;

const ModalStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

const StatBox = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 12px;
  border-radius: 10px;
  text-align: center;
`;

const StatBoxValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const StatBoxLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 2px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

// --- Loading / Empty ---
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: ${({ theme }) => theme.card};
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: 16px;
  gap: 16px;

  h3 { margin: 0; color: ${({ theme }) => theme.text_primary}; }
  p { margin: 0; color: ${({ theme }) => theme.text_secondary}; }
`;

const Spinner = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.text_secondary}40;
  border-top-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${Spinner} 0.8s linear infinite;
  margin: 40px auto;
`;

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Date State
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  
  // Filter State
  const [activeCategory, setActiveCategory] = useState("All");

  // Progress Modal State
  const [progressExercise, setProgressExercise] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [progressLoading, setProgressLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const showProgress = async (exerciseName) => {
    setProgressExercise(exerciseName);
    setProgressLoading(true);
    try {
      const response = await api.get(`/workouts/progress/${encodeURIComponent(exerciseName)}`);
      setProgressData(response.data);
    } catch (err) {
      setProgressData([]);
    } finally {
      setProgressLoading(false);
    }
  };

  const closeProgress = () => {
    setProgressExercise(null);
    setProgressData([]);
  };

  const fetchWorkouts = async (date) => {
    try {
      setLoading(true);
      const response = await api.get(`/workouts/${date.format("YYYY-MM-DD")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWorkouts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts(selectedDate);
  }, [selectedDate]);

  // Calendar Logic
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const calendarDays = [];
  let day = startDate;
  while (day.isBefore(endDate)) {
    calendarDays.push(day);
    day = day.add(1, 'day');
  }

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

  // Export Logic
  const exportToCSV = () => {
    if (!workouts.length) {
      setAlertMsg("No workouts to export for this date.");
      return;
    }
    const headers = ["Category", "Workout Name", "Sets", "Reps", "Weight (kg)", "Duration (min)"];
    const csvContent = [
      headers.join(","),
      ...workouts.map(w => `"${w.category}","${w.workout_name}",${w.sets},${w.reps},${w.weight},${w.duration}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `workouts_${selectedDate.format("YYYY-MM-DD")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Derived Data
  const categories = ["All", ...new Set(workouts.map(w => w.category))];
  const filteredWorkouts = activeCategory === "All" 
    ? workouts 
    : workouts.filter(w => w.category === activeCategory);

  const totalDuration = workouts.reduce((acc, curr) => acc + (parseInt(curr.duration) || 0), 0);
  const totalVolume = workouts.reduce((acc, curr) => acc + ((parseInt(curr.sets) || 0) * (parseInt(curr.reps) || 0) * (parseFloat(curr.weight) || 0)), 0);

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          <CalendarCard>
            <CalendarHeader>
              <MonthTitle>{currentMonth.format("MMMM YYYY")}</MonthTitle>
              <div style={{ display: 'flex', gap: '8px' }}>
                <NavIcon onClick={prevMonth}><FiChevronLeft size={20} /></NavIcon>
                <NavIcon onClick={nextMonth}><FiChevronRight size={20} /></NavIcon>
              </div>
            </CalendarHeader>
            
            <WeekDays>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <DayLabel key={d}>{d}</DayLabel>
              ))}
            </WeekDays>
            
            <DaysGrid>
              {calendarDays.map((d, i) => (
                <DayCell 
                  key={i}
                  isCurrentMonth={d.month() === currentMonth.month()}
                  isToday={d.isSame(dayjs(), 'day')}
                  selected={d.isSame(selectedDate, 'day')}
                  onClick={() => setSelectedDate(d)}
                >
                  {d.format('D')}
                </DayCell>
              ))}
            </DaysGrid>
          </CalendarCard>
        </LeftSide>

        <RightSide>
          <HeaderTop>
            <TitleBlock>
              <Title>Your Logbook</Title>
              <Subtitle>{selectedDate.format("dddd, MMMM D, YYYY")}</Subtitle>
            </TitleBlock>
            <Button 
              small 
              text="Export CSV" 
              leftIcon={<FiDownload size={16}/>} 
              onClick={exportToCSV} 
              outlined
            />
          </HeaderTop>

          <SummaryBar>
            <SummaryCard>
              <SummaryIcon color="#174657"><FiActivity /></SummaryIcon>
              <SummaryInfo>
                <SummaryLabel>Exercises</SummaryLabel>
                <SummaryValue>{workouts.length}</SummaryValue>
              </SummaryInfo>
            </SummaryCard>
            <SummaryCard>
              <SummaryIcon color="#00AEFF"><FiClock /></SummaryIcon>
              <SummaryInfo>
                <SummaryLabel>Active Time</SummaryLabel>
                <SummaryValue>{totalDuration} min</SummaryValue>
              </SummaryInfo>
            </SummaryCard>
            <SummaryCard>
              <SummaryIcon color="#16A34A"><FiTarget /></SummaryIcon>
              <SummaryInfo>
                <SummaryLabel>Volume Load</SummaryLabel>
                <SummaryValue>{totalVolume.toLocaleString()} kg</SummaryValue>
              </SummaryInfo>
            </SummaryCard>
          </SummaryBar>

          {workouts.length > 0 && (
            <FilterBar>
              {categories.map(cat => (
                <FilterTab 
                  key={cat} 
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </FilterTab>
              ))}
            </FilterBar>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <EmptyState>
              <h3>Error loading workouts</h3>
              <p>{error}</p>
            </EmptyState>
          ) : filteredWorkouts.length > 0 ? (
            <CardGrid>
              {filteredWorkouts.map((workout) => (
                <div key={workout.workout_id || workout._id || Math.random()}>
                  <WorkoutCard workout={workout} />
                  {workout.weight && workout.reps ? (
                    <button
                      onClick={() => showProgress(workout.workout_name)}
                      style={{
                        width: "100%",
                        marginTop: 8,
                        background: "none",
                        border: "1px solid #17465730",
                        borderRadius: 8,
                        padding: "6px 8px",
                        cursor: "pointer",
                        color: "#174657",
                        fontSize: 11,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#174657"; e.currentTarget.style.background = "#17465710"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#17465730"; e.currentTarget.style.background = "none"; }}
                      title="View progress"
                    >
                      <FiTrendingUp size={12} /> View Progress
                    </button>
                  ) : null}
                </div>
              ))}
            </CardGrid>
          ) : (
            <EmptyState>
              <FiActivity size={48} color="#D3D3D3" />
              <h3>Rest Day</h3>
              <p>No workouts recorded for this date. Time to recover or log a new session!</p>
            </EmptyState>
          )}
        </RightSide>

        {/* Progress Modal */}
        {progressExercise && (
          <ModalOverlay onClick={closeProgress}>
            <ModalCard onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>{progressExercise} Progress</ModalTitle>
                <CloseButton onClick={closeProgress}>&times;</CloseButton>
              </ModalHeader>
              {progressLoading ? (
                <LoadingSpinner />
              ) : progressData.length > 0 ? (
                <>
                  <ModalStats>
                    <StatBox>
                      <StatBoxValue>{Math.max(...progressData.map(d => d.estimated_1rm))} kg</StatBoxValue>
                      <StatBoxLabel>Best 1RM</StatBoxLabel>
                    </StatBox>
                    <StatBox>
                      <StatBoxValue>{Math.max(...progressData.map(d => d.weight))} kg</StatBoxValue>
                      <StatBoxLabel>Max Weight</StatBoxLabel>
                    </StatBox>
                    <StatBox>
                      <StatBoxValue>{progressData.length}</StatBoxValue>
                      <StatBoxLabel>Sessions</StatBoxLabel>
                    </StatBox>
                  </ModalStats>
                  <ChartWrapper>
                    <LineChart
                      xAxis={[{ data: progressData.map(d => new Date(d.date)), scaleType: "time", tickLabelStyle: { fontSize: 10 } }]}
                      series={[
                        { data: progressData.map(d => d.weight), label: "Weight (kg)", color: "#174657" },
                        { data: progressData.map(d => d.estimated_1rm), label: "Est. 1RM", color: "#FF6B00" },
                      ]}
                      height={300}
                      margin={{ left: 50, right: 20, top: 20, bottom: 30 }}
                      sx={{ "& .MuiChartsAxis-tickLabel": { fill: "#AFAFB5 !important", fontSize: 10 } }}
                    />
                  </ChartWrapper>
                </>
              ) : (
                <EmptyState>
                  <FiTrendingUp size={40} color="#D3D3D3" />
                  <h3>No progress data</h3>
                  <p>Need more logged sets with weight and reps to show progress.</p>
                </EmptyState>
              )}
            </ModalCard>
          </ModalOverlay>
        )}
      </Wrapper>

      <ConfirmModal
        open={!!alertMsg}
        variant="alert"
        title="Notice"
        message={alertMsg}
        confirmLabel="OK"
        onConfirm={() => setAlertMsg("")}
        onCancel={() => setAlertMsg("")}
      />
    </Container>
  );
};

export default Workouts;
