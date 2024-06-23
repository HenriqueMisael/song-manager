import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../index.ts';

import type { Authentication } from './model/authentication.ts';

const getState = (state: RootState) => state.session;

export const isDarkTheme = createSelector(getState, (state) => state.darkMode);

export const isLogged = createSelector(
  getState,
  (state) => state.user !== null,
);

export const getUserID = createSelector(
  getState,
  (state) => state.user?.id ?? '',
);

export const getUserName = createSelector(
  getState,
  (state) => state.user?.name ?? '',
);

export const getUserEmail = createSelector(
  getState,
  (state) => state.user?.email ?? '',
);

export const getUserImageURL = createSelector(
  getState,
  (state) => state.user?.imageURL ?? '',
);

export const getFetching = createSelector(getState, (state) => state.fetching);

export const isLoadingAuthentication = createSelector(
  getFetching,
  (fetching) => fetching === 'authentication',
);

export const isLoadingUserData = createSelector(
  getFetching,
  (fetching) => fetching === 'user data',
);

export const isLoadingSavedData = createSelector(
  getFetching,
  (fetching) => fetching === 'saved data',
);

export const isLoading = createSelector(
  [isLoadingUserData, isLoadingAuthentication],
  (isLoadingUserData, isLoadingAuthentication) =>
    isLoadingUserData || isLoadingAuthentication,
);

export const isSavingData = createSelector(
  getFetching,
  (fetching) => fetching === 'saving data',
);

export const isAuthenticated = createSelector(
  getState,
  (state) => state.authentication != null,
);

export const getAuthentication = createSelector(
  getState,
  (state) =>
    state.authentication ??
    ({ accessToken: '', tokenType: '', refreshToken: '' } as Authentication),
);
