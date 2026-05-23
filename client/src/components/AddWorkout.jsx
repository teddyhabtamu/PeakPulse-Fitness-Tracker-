import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import api from "../utils/api";
import ExerciseLibrary from "./ExerciseLibrary";
import { FiBookOpen } from "react-icons/fi";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
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
      
      <TextInput
        label="Date"
        type="date"
        value={workout.date}
        name="date"
        handleChange={handleChange}
      />
      
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
