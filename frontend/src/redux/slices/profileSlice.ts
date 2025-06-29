import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "@/types/user";

interface ProfileState {
  profiles: Record<string, Profile>;
}

const initialState: ProfileState = { profiles: {} };

const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    addProfile(state, action: PayloadAction<Profile>) {
      state.profiles[action.payload.id] = action.payload;
    },
    updateProfile(state, action: PayloadAction<Partial<Profile> & { id: string }>) {
      const { id, ...rest } = action.payload;
      state.profiles[id] = { ...state.profiles[id], ...rest };
    },
    removeProfile(state, action: PayloadAction<string>) {
      delete state.profiles[action.payload];
    },
    setProfiles(state, action: PayloadAction<Profile[]>) {
      // Convert array to normalized object
      state.profiles = action.payload.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as Record<string, Profile>);
    },
  },
});

export const { addProfile, updateProfile, removeProfile, setProfiles } = profileSlice.actions;
export default profileSlice.reducer;
