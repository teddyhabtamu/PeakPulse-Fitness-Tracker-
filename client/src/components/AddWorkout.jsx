import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { addWorkout } from "./api"; // Import your API utility function

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
  gap: 16px;
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

const AddWorkout = ({ token }) => {
  const [workout, setWorkout] = useState({
    category: "",
    workout_name: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    date: "", // Ensure date field is included
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value,
    }));
  };

  const handleAddWorkoutClick = async () => {
    try {
      // Ensure the date is in the correct format (YYYY-MM-DD)
      const formattedWorkout = {
        ...workout,
        date: workout.date, // The date is already in the correct format from the input
      };

      await addWorkout(formattedWorkout, token); // Pass token to addWorkout function
      setWorkout({
        category: "",
        workout_name: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        date: "", // Clear date field after successful addition
      });
      alert("Workout added successfully!");
    } catch (error) {
      console.error("Error adding workout:", error);
      alert("Failed to add workout");
    }
  };

  return (
    <Card>
      <Title>Add New Workout</Title>
      <TextInput
        label="Category"
        placeholder="e.g., Strength, Cardio, Flexibility"
        value={workout.category}
        name="category"
        handleChange={handleChange}
      />
      <TextInput
        label="Workout Name"
        placeholder="e.g., Bench Press, Running"
        value={workout.workout_name}
        name="workout_name"
        handleChange={handleChange}
      />
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
      <TextInput
        label="Weight (kg)"
        placeholder="e.g., 60"
        type="number"
        value={workout.weight}
        name="weight"
        handleChange={handleChange}
      />
      <TextInput
        label="Duration (min)"
        placeholder="e.g., 30"
        type="number"
        value={workout.duration}
        name="duration"
        handleChange={handleChange}
      />
      <TextInput
        label="Date"
        type="date" // Use type="date" for calendar picker
        value={workout.date}
        name="date"
        handleChange={handleChange}
      />
      <Button text="Add Workout" small onClick={handleAddWorkoutClick} />
    </Card>
  );
};

export default AddWorkout;
