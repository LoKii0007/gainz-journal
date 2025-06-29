import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workout } from "@/types/workout";
import { removeExercise } from "./exerciseSlice";
import { AppDispatch } from "../store";

interface WorkoutState {
  workouts: Record<string, Workout>;
}

const initialState: WorkoutState = { workouts: {} };

const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    addWorkout(state, action: PayloadAction<Workout>) {
      state.workouts[action.payload.id] = action.payload;
    },
    updateWorkout(state, action: PayloadAction<Partial<Workout> & { id: string }>) {
      const { id, ...rest } = action.payload;
      state.workouts[id] = { ...state.workouts[id], ...rest };
    },
    removeWorkout(state, action: PayloadAction<string>) {
      delete state.workouts[action.payload];
    },
    setWorkouts(state, action: PayloadAction<Workout[]>) {
      // Convert array to normalized object
      state.workouts = action.payload.reduce((acc, workout) => {
        acc[workout.id] = workout;
        return acc;
      }, {} as Record<string, Workout>);
    },
  },
});

export const { addWorkout, updateWorkout, removeWorkout, setWorkouts } = workoutSlice.actions;

// Thunk to handle cascading deletes
export const deleteWorkoutWithExercises = (workoutId: string) => async (dispatch: AppDispatch, getState: () => any) => {
  const workout = getState().workout.workouts[workoutId];
  if (workout) {
    // Delete all exercises first
    workout.exerciseIds.forEach((exerciseId: string) => {
      dispatch(removeExercise(exerciseId));
    });
    // Then delete the workout
    dispatch(removeWorkout(workoutId));
  }
};

export default workoutSlice.reducer;
