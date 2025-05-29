import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise, Workout } from "@/types/workout";

// Load initial state from localStorage
const loadInitialState = (): Workout[] => {
  try {
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  } catch (error) {
    console.error('Failed to load workouts from localStorage:', error);
    return [];
  }
};

const workoutSlice = createSlice({
  name: "workout",
  initialState: loadInitialState(),
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
    deleteExerciseFromWorkout: (
      state,
      action: PayloadAction<{ workoutId: string; exerciseId: string }>
    ) => {
      const { workoutId, exerciseId } = action.payload;
      const workoutIndex = state.findIndex((w) => w.id === workoutId);

      if (workoutIndex !== -1 && state[workoutIndex].exercises) {
        state[workoutIndex].exercises = state[workoutIndex].exercises.filter(
          (e) => e.id !== exerciseId
        );
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
  deleteExerciseFromWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;
