import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../index.ts";

const getState = (state: RootState) => state.session;

export const isDarkTheme = createSelector(getState, state => state.darkMode);

export const isLogged = createSelector(getState, state => state.user !== null);

export const getUserName = createSelector(getState, state => state.user?.name ?? "");

export const getUserEmail = createSelector(getState, state => state.user?.email ?? "");

export const getUserImageURL = createSelector(getState, state => state.user?.image ?? "");

export const getFetching = createSelector(getState, state => state.fetching)