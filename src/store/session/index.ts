import { createSlice } from "@reduxjs/toolkit";

export interface SessionState {
  darkMode: boolean;
}

const initialState: SessionState = {
  darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    }
  }
});

const { actions, reducer } = sessionSlice;

export const { toggleDarkMode } = actions;

export default reducer;