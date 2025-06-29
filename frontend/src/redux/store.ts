import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import exerciseReducer from "./slices/exerciseSlice";
import workoutReducer from "./slices/workoutSlice";
import profileReducer from "./slices/profileSlice";
import setReducer from "./slices/setSlice";
import { localStorageMiddleware } from "./middleware/localStorage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercise: exerciseReducer,
    workout: workoutReducer,
    profile: profileReducer,
    set: setReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 