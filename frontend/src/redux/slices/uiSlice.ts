import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isDrawerOpen: boolean;
  isProfileSwitcherOpen: boolean;
  isLoading: boolean;
  darkMode: boolean;
}

const initialState: UiState = {
  isDrawerOpen: false,
  isProfileSwitcherOpen: false,
  isLoading: false,
  darkMode: localStorage.getItem("darkMode") === "true",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    toggleProfileSwitcher: (state) => {
      state.isProfileSwitcherOpen = !state.isProfileSwitcherOpen;
    },
    setProfileSwitcherOpen: (state, action: PayloadAction<boolean>) => {
      state.isProfileSwitcherOpen = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode.toString());
      if (state.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", action.payload.toString());
      if (action.payload) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  },
});

export const {
  toggleDrawer,
  setDrawerOpen,
  toggleProfileSwitcher,
  setProfileSwitcherOpen,
  setIsLoading,
  toggleDarkMode,
  setDarkMode
} = uiSlice.actions;

export default uiSlice.reducer; 