import { createSlice } from '@reduxjs/toolkit';

import type { Playlist } from './model/playlist.ts';
import * as selectors from './selectors.ts';
import {
  analysePlaylist,
  fetchPlaylists,
  loadSavedPlaylistData,
} from './thunk.ts';

type Status = '' | 'fetching' | 'loaded' | 'error';

export interface PlaylistState {
  playlistByPlaylistID: { [key: string]: Playlist };
  status: Status;
}

const initialState: PlaylistState = {
  playlistByPlaylistID: {},
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
        state.playlistByPlaylistID = Object.fromEntries(
          action.payload.items.map((playlist) => [playlist.id, playlist]),
        );
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
        state.playlistByPlaylistID = action.payload;
      })
      .addCase(loadSavedPlaylistData.rejected, (state, action) => {
        state.status = 'error';
        console.error(action.error);
      })
      .addCase(analysePlaylist.pending, () => {})
      .addCase(analysePlaylist.fulfilled, (state, action) => {
        const {
          playlistID,
          tracks,
          averageAudioFeatures,
          lowerAudioFeatures,
          higherAudioFeatures,
        } = action.payload;
        const playlist = state.playlistByPlaylistID[playlistID];
        if (playlist == null) return;
        playlist.averageAudioAnalysis = averageAudioFeatures;
        playlist.lowerAudioAnalysis = lowerAudioFeatures;
        playlist.higherAudioAnalysis = higherAudioFeatures;
        playlist.tracks = tracks;
      })
      .addCase(analysePlaylist.rejected, (state, action) => {
        state.status = 'error';
        console.error(action.error);
      }),
});

const { actions, reducer } = playlistSlice;

export const playlistActions = actions;

export const playlistSelectors = selectors;

export default reducer;
