import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise, Workout, WorkoutState } from "@/types/workout";


const initialState: WorkoutState = {
  workouts: [],
  loading: false,
  error: null,
  selectedWorkout: null,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkoutLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWorkoutError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWorkouts: (state, action: PayloadAction<Workout[]>) => {
      state.workouts = action.payload;
    },
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.workouts.push(action.payload);
    },
    updateWorkout: (state, action: PayloadAction<Workout>) => {
      const index = state.workouts.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.workouts[index] = action.payload;
      }
      if (state.selectedWorkout?.id === action.payload.id) {
        state.selectedWorkout = action.payload;
      }
    },
    deleteWorkout: (state, action: PayloadAction<string>) => {
      state.workouts = state.workouts.filter(w => w.id !== action.payload);
      if (state.selectedWorkout?.id === action.payload) {
        state.selectedWorkout = null;
      }
    },
    setSelectedWorkout: (state, action: PayloadAction<Workout | null>) => {
      state.selectedWorkout = action.payload;
    },
    addExerciseToWorkout: (state, action: PayloadAction<{ workoutId: string, exercise: Exercise }>) => {
      const { workoutId, exercise } = action.payload;
      const workoutIndex = state.workouts.findIndex(w => w.id === workoutId);
      
      if (workoutIndex !== -1) {
        if (!state.workouts[workoutIndex].exercises) {
          state.workouts[workoutIndex].exercises = [];
        }
        state.workouts[workoutIndex].exercises.push(exercise);
      }
      
      if (state.selectedWorkout?.id === workoutId) {
        if (!state.selectedWorkout.exercises) {
          state.selectedWorkout.exercises = [];
        }
        state.selectedWorkout.exercises.push(exercise);
      }
    },
    removeExerciseFromWorkout: (state, action: PayloadAction<{ workoutId: string, exerciseId: string }>) => {
      const { workoutId, exerciseId } = action.payload;
      const workoutIndex = state.workouts.findIndex(w => w.id === workoutId);
      
      if (workoutIndex !== -1 && state.workouts[workoutIndex].exercises) {
        state.workouts[workoutIndex].exercises = state.workouts[workoutIndex].exercises.filter(
          e => e.id !== exerciseId
        );
      }
      
      if (state.selectedWorkout?.id === workoutId && state.selectedWorkout.exercises) {
        state.selectedWorkout.exercises = state.selectedWorkout.exercises.filter(
          e => e.id !== exerciseId
        );
      }
    },
    reorderExercisesInWorkout: (state, action: PayloadAction<{ workoutId: string, exercises: Exercise[] }>) => {
      const { workoutId, exercises } = action.payload;
      const workoutIndex = state.workouts.findIndex(w => w.id === workoutId);
      
      if (workoutIndex !== -1) {
        state.workouts[workoutIndex].exercises = exercises;
      }
      
      if (state.selectedWorkout?.id === workoutId) {
        state.selectedWorkout.exercises = exercises;
      }
    }
  },
});

export const {
  setWorkoutLoading,
  setWorkoutError,
  setWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  setSelectedWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  reorderExercisesInWorkout
} = workoutSlice.actions;

export default workoutSlice.reducer; 