import { Exercise, ExerciseState, Set } from "@/types/workout";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ExerciseState = {
  exercises: [],
  selectedExercise: null,
  exerciseHistory: []
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<Exercise[]>) => {
      state.exercises = action.payload;
    },
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.exercises.push(action.payload);
    },
    updateExercise: (state, action: PayloadAction<Exercise>) => {
      const index = state.exercises.findIndex(ex => ex.id === action.payload.id);
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
      if (state.selectedExercise?.id === action.payload.id) {
        state.selectedExercise = action.payload;
      }
    },
    deleteExercise: (state, action: PayloadAction<string>) => {
      state.exercises = state.exercises.filter(ex => ex.id !== action.payload);
      if (state.selectedExercise?.id === action.payload) {
        state.selectedExercise = null;
      }
    },
    setSelectedExercise: (state, action: PayloadAction<Exercise | null>) => {
      state.selectedExercise = action.payload;
    },
    addSet: (state, action: PayloadAction<{ exerciseId: string, set: Set }>) => {
      const { exerciseId, set } = action.payload;
      const exerciseIndex = state.exercises.findIndex(ex => ex.id === exerciseId);
      
      if (exerciseIndex !== -1) {
        state.exercises[exerciseIndex].sets.push(set);
      }
      
      if (state.selectedExercise?.id === exerciseId) {
        state.selectedExercise.sets.push(set);
      }
    },
    updateSet: (state, action: PayloadAction<{ exerciseId: string, set: Set }>) => {
      const { exerciseId, set } = action.payload;
      const exerciseIndex = state.exercises.findIndex(ex => ex.id === exerciseId);
      
      if (exerciseIndex !== -1) {
        const setIndex = state.exercises[exerciseIndex].sets.findIndex(s => s.id === set.id);
        if (setIndex !== -1) {
          state.exercises[exerciseIndex].sets[setIndex] = set;
        }
      }
      
      if (state.selectedExercise?.id === exerciseId) {
        const setIndex = state.selectedExercise.sets.findIndex(s => s.id === set.id);
        if (setIndex !== -1) {
          state.selectedExercise.sets[setIndex] = set;
        }
      }
    },
    deleteSet: (state, action: PayloadAction<{ exerciseId: string, setId: string }>) => {
      const { exerciseId, setId } = action.payload;
      const exerciseIndex = state.exercises.findIndex(ex => ex.id === exerciseId);
      
      if (exerciseIndex !== -1) {
        state.exercises[exerciseIndex].sets = state.exercises[exerciseIndex].sets.filter(s => s.id !== setId);
      }
      
      if (state.selectedExercise?.id === exerciseId) {
        state.selectedExercise.sets = state.selectedExercise.sets.filter(s => s.id !== setId);
      }
    },
    setExerciseHistory: (state, action: PayloadAction<Exercise[]>) => {
      state.exerciseHistory = action.payload;
    },
    clearExerciseHistory: (state) => {
      state.exerciseHistory = [];
    }
  },
});

export const {
  setExercises,
  addExercise,
  updateExercise,
  deleteExercise,
  setSelectedExercise,
  addSet,
  updateSet,
  deleteSet,
  setExerciseHistory,
  clearExerciseHistory
} = exerciseSlice.actions;

export default exerciseSlice.reducer; 