import { AuthState } from "@/types/auth";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  email: null,
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
      console.log(action.payload.currentProfileId);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentProfileId", action.payload.currentProfileId);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("currentProfileId");
    },
  },
});

export const {
  login,
  logout,
} = authSlice.actions;

export default authSlice.reducer; 