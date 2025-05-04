import { AuthState } from "@/types/auth";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  email: null,
  currentProfileId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string, currentProfileId: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.email = action.payload.user.email;
      state.currentProfileId = action.payload.currentProfileId;
      localStorage.setItem("token", action.payload.token);
    },
    updateProfileId: (state, action: PayloadAction<string>) => {
      state.currentProfileId = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.email = null;
      state.currentProfileId = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  login,
  logout,
  updateProfileId,
} = authSlice.actions;

export default authSlice.reducer; 