import { Exercise } from "@/types/workout";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeSet } from "./setSlice";
import { AppDispatch } from "../store";

interface ExerciseState {
  exercises: Record<string, Exercise>;
}

const initialState: ExerciseState = { exercises: {} };

const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise(state, action: PayloadAction<Exercise>) {
      state.exercises[action.payload.id] = action.payload;
    },
    updateExercise(state, action: PayloadAction<Partial<Exercise> & { id: string }>) {
      const { id, ...rest } = action.payload;
      state.exercises[id] = { ...state.exercises[id], ...rest };
    },
    removeExercise(state, action: PayloadAction<string>) {
      delete state.exercises[action.payload];
    },
  },
});

export const { addExercise, updateExercise, removeExercise } = exerciseSlice.actions;

// Thunk to handle cascading deletes
export const deleteExerciseWithSets = (exerciseId: string) => async (dispatch: AppDispatch, getState: () => any) => {
  const state = getState();
  const sets = state.set.sets;
  
  // Delete all sets that belong to this exercise
  Object.entries(sets).forEach(([setId, set]: [string, any]) => {
    if (set.exerciseId === exerciseId) {
      dispatch(removeSet(setId));
    }
  });
  
  // Then delete the exercise
  dispatch(removeExercise(exerciseId));
};

export default exerciseSlice.reducer;
