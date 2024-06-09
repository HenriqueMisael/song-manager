import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Authentication } from './model/authentication.ts';
import { User } from './model/user.ts';
import * as selectors from './selectors.ts';
import { fetchAuthentication, fetchUserData } from './thunk.ts';

type FetchingStatus = '' | 'authentication' | 'user data';

export interface SessionState {
  darkMode: boolean;
  user: User | null;
  authentication: Authentication | null;
  fetching: FetchingStatus;
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
    setFetching(state, action: PayloadAction<FetchingStatus>) {
      state.fetching = action.payload;
    },
    setAuthentication(state, action: PayloadAction<Authentication | null>) {
      state.authentication = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAuthentication.pending, (state) => {
        state.fetching = 'authentication';
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

export const sessionActions = actions;

export const sessionSelectors = selectors;

export default reducer;
