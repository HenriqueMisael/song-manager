import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../index.ts";

const getState = (state: RootState) => state.session;

export const isDarkTheme = createSelector(getState, state => state.darkMode);