import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import api from "../utils/api";
import ExerciseLibrary from "./ExerciseLibrary";
import dayjs from "dayjs";
import { FiBookOpen, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0px 4px 12px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 600px) {
    padding: 16px;
    max-width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: end;

  & > :first-child {
    flex: 1;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;

    & > :first-child {
      flex: none;
    }
  }
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
`;

const Message = styled.div`
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ type, theme }) => (type === "error" ? theme.red + "15" : theme.green + "15")};
  color: ${({ type, theme }) => (type === "error" ? theme.red : theme.green)};
  border: 1px solid ${({ type, theme }) => (type === "error" ? theme.red + "30" : theme.green + "30")};
`;

const BrowseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.primary}10;
  border: 1px dashed ${({ theme }) => theme.primary}50;
  border-radius: 12px;
  color: ${({ theme }) => theme.primary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.primary}20;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const DateToggle = styled.button`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: inherit;
  transition: border-color 0.2s;
  &:hover { border-color: ${({ theme }) => theme.primary}; }
`;

const CalDropdown = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 50;
`;

const CalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CalMonth = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const CalNav = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  &:hover { background: ${({ theme }) => theme.primary}15; color: ${({ theme }) => theme.primary}; }
`;

const CalWeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
  text-align: center;
`;

const CalDayLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const CalDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const CalDay = styled.button`
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  background: ${({ selected, isToday, theme }) =>
    selected ? theme.primary : isToday ? theme.primary + "15" : "transparent"};
  color: ${({ selected, isToday, theme }) =>
    selected ? "#FFF" : isToday ? theme.primary : theme.text_primary};
  font-weight: ${({ selected, isToday }) => (selected || isToday ? "700" : "500")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth !== false ? "1" : "0.3")};
  &:hover { background: ${({ selected, theme }) => selected ? theme.primary : theme.primary + "20"}; color: ${({ selected, theme }) => selected ? "#FFF" : theme.primary}; }
`;

const Grid2Col = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const AddWorkout = ({ onWorkoutAdded }) => {
  const [workout, setWorkout] = useState({
    category: "",
    workout_name: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(dayjs());

  const startOfMonth = calMonth.startOf('month');
  const endOfMonth = calMonth.endOf('month');
  const calStart = startOfMonth.startOf('week');
  const calEnd = endOfMonth.endOf('week');
  const calDays = [];
  let d = calStart;
  while (d.isBefore(calEnd)) { calDays.push(d); d = d.add(1, 'day'); }

  const selectDate = (day) => {
    setWorkout((prev) => ({ ...prev, date: day.format("YYYY-MM-DD") }));
    setCalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value,
    }));
  };

  const handleSelectExercise = (exercise) => {
    setWorkout((prev) => ({
      ...prev,
      category: exercise.category,
      workout_name: exercise.name,
      sets: exercise.defaultSets ? String(exercise.defaultSets) : prev.sets,
      reps: exercise.defaultReps ? String(exercise.defaultReps) : prev.reps,
      duration: exercise.defaultDuration ? String(exercise.defaultDuration) : prev.duration,
    }));
  };

  const handleAddWorkoutClick = async () => {
    if (!workout.workout_name || !workout.category || !workout.date) {
      setMessage({ text: "Name, Category, and Date are required.", type: "error" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      const payload = {
        ...workout,
        sets: workout.sets === "" ? null : workout.sets,
        reps: workout.reps === "" ? null : workout.reps,
        weight: workout.weight === "" ? null : workout.weight,
        duration: workout.duration === "" ? null : workout.duration,
      };
      await api.post("/workouts", payload);
      
      setWorkout({
        category: "",
        workout_name: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        date: new Date().toISOString().split('T')[0],
      });
      
      setMessage({ text: "Workout added successfully!", type: "success" });
      
      if (onWorkoutAdded) {
        onWorkoutAdded();
      }
      
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error adding workout:", error);
      setMessage({ text: "Failed to add workout. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>Log New Workout</Title>
      
      {message.text && <Message type={message.type}>{message.text}</Message>}

      <Row>
        <TextInput
          label="Category"
          placeholder="e.g., Strength"
          value={workout.category}
          name="category"
          handleChange={handleChange}
        />
        <BrowseButton onClick={() => setLibraryOpen(true)}>
          <FiBookOpen size={16} /> Browse
        </BrowseButton>
      </Row>

      <TextInput
        label="Workout Name"
        placeholder="e.g., Bench Press"
        value={workout.workout_name}
        name="workout_name"
        handleChange={handleChange}
      />
      
      <Grid2Col>
        <TextInput
          label="Sets"
          placeholder="e.g., 3"
          type="number"
          value={workout.sets}
          name="sets"
          handleChange={handleChange}
        />
        <TextInput
          label="Reps"
          placeholder="e.g., 12"
          type="number"
          value={workout.reps}
          name="reps"
          handleChange={handleChange}
        />
      </Grid2Col>

      <Grid2Col>
        <TextInput
          label="Weight (kg)"
          placeholder="e.g., 60"
          type="number"
          value={workout.weight}
          name="weight"
          handleChange={handleChange}
        />
        <TextInput
          label="Duration (m)"
          placeholder="e.g., 30"
          type="number"
          value={workout.duration}
          name="duration"
          handleChange={handleChange}
        />
      </Grid2Col>
      
      <div style={{ position: "relative" }}>
        <DateToggle type="button" onClick={() => setCalOpen(!calOpen)}>
          <span>{dayjs(workout.date).format("MMM D, YYYY")}</span>
          <FiChevronRight size={14} style={{ transform: calOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
        </DateToggle>
        {calOpen && (
          <CalDropdown>
            <CalHeader>
              <CalNav onClick={() => setCalMonth(calMonth.subtract(1, 'month'))}><FiChevronLeft size={18} /></CalNav>
              <CalMonth>{calMonth.format("MMMM YYYY")}</CalMonth>
              <CalNav onClick={() => setCalMonth(calMonth.add(1, 'month'))}><FiChevronRight size={18} /></CalNav>
            </CalHeader>
            <CalWeekDays>
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <CalDayLabel key={d}>{d}</CalDayLabel>)}
            </CalWeekDays>
            <CalDaysGrid>
              {calDays.map((day, i) => (
                <CalDay
                  key={i}
                  isCurrentMonth={day.month() === calMonth.month()}
                  selected={day.format("YYYY-MM-DD") === workout.date}
                  isToday={day.isSame(dayjs(), 'day')}
                  onClick={() => selectDate(day)}
                >
                  {day.format('D')}
                </CalDay>
              ))}
            </CalDaysGrid>
          </CalDropdown>
        )}
      </div>
      
      <Button 
        text="Add Workout" 
        onClick={handleAddWorkoutClick} 
        isLoading={loading}
      />

      {libraryOpen && (
        <ExerciseLibrary
          onSelect={handleSelectExercise}
          onClose={() => setLibraryOpen(false)}
        />
      )}
    </Card>
  );
};

export default AddWorkout;
