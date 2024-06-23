import { createAsyncThunk } from '@reduxjs/toolkit';

import spotify from '../../../api/spotify.ts';
import type { RootState } from '../../../store';
import { sessionSelectors } from '../../../store/session';

import type { Playlist } from './model/playlist.ts';

export const fetchPlaylists = createAsyncThunk(
  'playlists/fetch',
  async (_, thunkAPI) => {
    const authentication = sessionSelectors.getAuthentication(
      thunkAPI.getState() as RootState,
    );

    const json = await spotify.sendRequest(authentication, 'me/playlists');
    const next = json['next'];
    const playlists: Playlist[] = json['items'].map(
      (simplifiedPlaylist: never) => {
        const id = simplifiedPlaylist['id'];
        const name = simplifiedPlaylist['name'];
        const description = simplifiedPlaylist['description'];
        const imageURI = simplifiedPlaylist['images']?.[0]['url'] ?? '';
        const trackCount = simplifiedPlaylist['tracks']['total'];

        return { id, name, description, imageURI, trackCount } as Playlist;
      },
    );
    const songPlaylists: Playlist[] = [];
    for (const playlist of playlists) {
      const firstTrackResponse = await spotify.sendRequest(
        authentication,
        `playlists/${playlist.id}/tracks?limit=1`,
      );
      const firstTrackInfo = firstTrackResponse['items'][0]['track'];
      if (firstTrackInfo == null) continue;
      if (firstTrackInfo['album'] == null) continue;
      if (firstTrackInfo['album']['type'] !== 'album') continue;
      songPlaylists.push(playlist);
    }

    return {
      next,
      items: songPlaylists,
    };
  },
);

export const loadSavedPlaylistData = createAsyncThunk(
  'playlists/load',
  async (userID: string) => {
    const { playlists } = JSON.parse(localStorage.getItem(userID) ?? '');

    return playlists as Playlist[];
  },
);
