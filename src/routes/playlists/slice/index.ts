import { createSlice } from '@reduxjs/toolkit';

import type { Playlist } from './model/playlist.ts';
import * as selectors from './selectors.ts';
import { loadSavedPlaylistData, fetchPlaylists } from './thunk.ts';

type Status = '' | 'fetching' | 'loaded' | 'error';

export interface PlaylistState {
  playlists: Playlist[];
  status: Status;
}

const initialState: PlaylistState = {
  playlists: [],
  status: '',
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = 'fetching';
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.playlists = action.payload.items;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = 'error';
        console.error(action.error);
      })
      .addCase(loadSavedPlaylistData.pending, (state) => {
        state.status = 'fetching';
      })
      .addCase(loadSavedPlaylistData.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.playlists = action.payload;
      }),
});

const { actions, reducer } = playlistSlice;

export const playlistActions = actions;

export const playlistSelectors = selectors;

export default reducer;
