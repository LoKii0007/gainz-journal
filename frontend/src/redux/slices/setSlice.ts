import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Set } from "@/types/workout";

  
  interface SetState {
    sets: Record<string, Set>;
  }
  
  const initialState: SetState = { sets: {} };
  
  const setSlice = createSlice({
    name: "sets",
    initialState,
    reducers: {
      addSet(state, action: PayloadAction<Set>) {
        state.sets[action.payload.id] = action.payload;
      },
      updateSet(state, action: PayloadAction<Partial<Set> & { id: string }>) {
        const { id, ...rest } = action.payload;
        state.sets[id] = { ...state.sets[id], ...rest };
      },
      removeSet(state, action: PayloadAction<string>) {
        delete state.sets[action.payload];
      },
    },
  });
  
  export const { addSet, updateSet, removeSet } = setSlice.actions;
  export default setSlice.reducer;
  