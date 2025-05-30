import { AuthState } from "@/types/auth";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  // user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  email: null,
  currentProfileId: null,
  gender: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string, currentProfileId: string }>) => {
      // state.user = action.payload.user;
      state.name = action.payload.user.name || null;
      state.gender = action.payload.user.gender || null;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.email = action.payload.user.email;
      state.currentProfileId = action.payload.currentProfileId;
      localStorage.setItem("token", action.payload.token);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      // state.user = action.payload;
      state.email = action.payload.email;
    },
    updateProfileId: (state, action: PayloadAction<string>) => {
      state.currentProfileId = action.payload;
    },
    logout: (state) => {
      // state.user = null;
      state.name = null;
      state.gender = null;
      state.token = null;
      state.isAuthenticated = false;
      state.email = null;
      state.currentProfileId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("profiles");
      localStorage.removeItem("workouts");
      localStorage.removeItem("currentProfileId");
      localStorage.removeItem("exercises");
    },
  },
});

export const {
  login,
  logout,
  updateUser,
  updateProfileId,
} = authSlice.actions;

export default authSlice.reducer; 