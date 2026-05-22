import api from "../utils/api";

export const addWorkout = async (workoutData, token) => {
  try {
    const response = await api.post("/workouts", workoutData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
