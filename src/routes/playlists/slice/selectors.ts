import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../../store';

const getState = (state: RootState) => state.playlist;

export const getStatus = createSelector(getState, (state) => state.status);

export const isFetching = createSelector(
  getStatus,
  (status) => status === 'fetching',
);

export const isLoaded = createSelector(
  getStatus,
  (status) => status === 'loaded' || status === 'error',
);

export const getPlaylists = createSelector(
  getState,
  (state) => state.playlists,
);
