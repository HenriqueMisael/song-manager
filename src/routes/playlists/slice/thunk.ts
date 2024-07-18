import { createAsyncThunk } from '@reduxjs/toolkit';

import spotify from '../../../api/spotify.ts';
import type { RootState } from '../../../store';
import { sessionSelectors } from '../../../store/session';

import { newAudioFeatures } from './model/audio-features.ts';
import type { AudioFeatures } from './model/audio-features.ts';
import type { Playlist } from './model/playlist.ts';
import type { Track } from './model/track.ts';

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

        return {
          id,
          name,
          description,
          imageURI,
          trackCount,
          tracks: [],
          averageAudioAnalysis: null,
          lowerAudioAnalysis: null,
          higherAudioAnalysis: null,
        } as Playlist;
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
    const { playlistByPlaylistID } = JSON.parse(
      localStorage.getItem(userID) ?? '',
    );
    return Object.fromEntries(playlistByPlaylistID);
  },
);

function treatAudioFeatureForTrack(
  averageAudioFeatures: AudioFeatures,
  lowerAudioFeatures: AudioFeatures,
  higherAudioFeatures: AudioFeatures,
  trackAudioFeatures: AudioFeatures,
  audioFeature: keyof AudioFeatures,
) {
  const trackAudioFeatureValue = trackAudioFeatures[audioFeature];
  averageAudioFeatures[audioFeature] += trackAudioFeatureValue;
  lowerAudioFeatures[audioFeature] = Math.min(
    lowerAudioFeatures[audioFeature],
    trackAudioFeatureValue,
  );
  higherAudioFeatures[audioFeature] = Math.max(
    higherAudioFeatures[audioFeature],
    trackAudioFeatureValue,
  );
}

export const analysePlaylist = createAsyncThunk(
  'playlists/analyse',
  async (playlistID: string, thunkAPI) => {
    const authentication = sessionSelectors.getAuthentication(
      thunkAPI.getState() as RootState,
    );
    const response = await await spotify.sendRequest(
      authentication,
      `playlists/${playlistID}/tracks`,
    );

    const tracks: Track[] = response['items'].map((item: never) => {
      const {
        track: { id, name, popularity, uri },
      } = item;

      return { id, name, popularity, uri };
    });

    const averageAudioFeatures = newAudioFeatures();
    const higherAudioFeatures = newAudioFeatures();
    const lowerAudioFeatures = newAudioFeatures(999);

    for (const track of tracks) {
      const {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        loudness,
        mode,
        speechiness,
        tempo,
        time_signature,
        valence,
      } = await spotify.sendRequest(
        authentication,
        `audio-features/${track.id}`,
      );
      track.audioFeatures = {
        title: 'track',
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        loudness,
        mode,
        speechiness,
        tempo,
        time_signature,
        valence,
      } as AudioFeatures;
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'acousticness',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'danceability',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'energy',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'instrumentalness',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'liveness',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'loudness',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'mode',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'speechiness',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'tempo',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'time_signature',
      );
      treatAudioFeatureForTrack(
        averageAudioFeatures,
        lowerAudioFeatures,
        higherAudioFeatures,
        track.audioFeatures,
        'valence',
      );
    }

    averageAudioFeatures.acousticness /= tracks.length;
    averageAudioFeatures.danceability /= tracks.length;
    averageAudioFeatures.energy /= tracks.length;
    averageAudioFeatures.instrumentalness /= tracks.length;
    averageAudioFeatures.liveness /= tracks.length;
    averageAudioFeatures.loudness /= tracks.length;
    averageAudioFeatures.mode /= tracks.length;
    averageAudioFeatures.speechiness /= tracks.length;
    averageAudioFeatures.tempo /= tracks.length;
    averageAudioFeatures.time_signature /= tracks.length;
    averageAudioFeatures.valence /= tracks.length;

    return {
      playlistID,
      tracks,
      averageAudioFeatures,
      lowerAudioFeatures,
      higherAudioFeatures,
    };
  },
);
