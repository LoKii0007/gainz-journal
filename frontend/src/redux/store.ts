import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import exerciseReducer from "./slices/exerciseSlice";
import workoutReducer from "./slices/workoutSlice";
import profileReducer from "./slices/profileSlice";
import setReducer from "./slices/setSlice";
import { localStorageMiddleware } from "./middleware/localStorage";

// Create a root reducer that handles resetting the entire store
const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout') {
    // Reset all slices to their initial state
    state = undefined;
  }
  return {
    auth: authReducer(state?.auth, action),
    exercise: exerciseReducer(state?.exercise, action),
    workout: workoutReducer(state?.workout, action),
    profile: profileReducer(state?.profile, action),
    set: setReducer(state?.set, action),
  };
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 