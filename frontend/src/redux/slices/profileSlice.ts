import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "@/types/user";

// Load initial state from localStorage
const loadInitialState = (): Profile[] => {
  try {
    const savedProfiles = localStorage.getItem('profiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  } catch (error) {
    console.error('Failed to load profiles from localStorage:', error);
    return [];
  }
};

const profileSlice = createSlice({
  name: "profile",
  initialState: loadInitialState(),
  reducers: {
    setProfiles: (_state, action: PayloadAction<Profile[]>) => {
      return action.payload;
    },
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.push(action.payload);
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      const index = state.findIndex((p : Profile) => p.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteProfile: (state, action: PayloadAction<string>) => {
      state = state.filter((p : Profile) => p.id !== action.payload);
    },
  },
});

export const {
  setProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
} = profileSlice.actions;

export default profileSlice.reducer; 