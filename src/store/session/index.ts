import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from './model/user.ts';
import * as selectors from './selectors.ts';
import { Authentication } from './model/authentication.ts';
import { fetchAuthentication, fetchUserData } from './thunk.ts';

export interface SessionState {
  darkMode: boolean;
  user: User | null;
  authentication: Authentication | null;
  fetching: string;
}

const initialState: SessionState = {
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  user: null,
  fetching: '',
  authentication: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAuthentication.pending, (state) => {
        state.fetching = 'access token';
      })
      .addCase(fetchAuthentication.fulfilled, (state, action) => {
        state.fetching = '';
        state.authentication = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.fetching = 'user data';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.fetching = '';
        state.user = action.payload;
      }),
});

const { actions, reducer } = sessionSlice;

export const { toggleDarkMode } = actions;

export const sessionSelectors = selectors;

export default reducer;
