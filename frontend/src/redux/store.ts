import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import exerciseReducer from "./slices/exerciseSlice";
import workoutReducer from "./slices/workoutSlice";
import profileReducer from "./slices/profileSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercise: exerciseReducer,
    workout: workoutReducer,
    profile: profileReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 