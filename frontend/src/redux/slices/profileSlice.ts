import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "@/types/auth";

interface ProfileState {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.profiles = action.payload;
    },
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles.push(action.payload);
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      const index = state.profiles.findIndex((p : Profile) => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    },
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter((p : Profile) => p.id !== action.payload);
    },
  },
});

export const {
  setProfileLoading,
  setProfileError,
  setProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
} = profileSlice.actions;

export default profileSlice.reducer; 