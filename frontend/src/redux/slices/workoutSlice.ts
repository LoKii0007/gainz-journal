import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise, Workout } from "@/types/workout";

const workoutSlice = createSlice({
  name: "workout",
  initialState: [] as Workout[],
  reducers: {
    setWorkouts: (_state, action: PayloadAction<Workout[]>) => {
      return action.payload;
    },
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.push(action.payload);
    },
    updateWorkout: (state, action: PayloadAction<Workout>) => {
      const index = state.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteWorkout: (state, action: PayloadAction<string>) => {
      return state.filter((w) => w.id !== action.payload);
    },
    addExerciseToWorkout: (
      state,
      action: PayloadAction<{ workoutId: string; exercise: Exercise }>
    ) => {
      const { workoutId, exercise } = action.payload;
      const workoutIndex = state.findIndex((w) => w.id === workoutId);

      if (workoutIndex !== -1) {
        if (!state[workoutIndex].exercises) {
          state[workoutIndex].exercises = [];
        }
        state[workoutIndex].exercises.push(exercise);
      }
    },
  },
});

export const {
  setWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  addExerciseToWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;
