import { createAsyncThunk } from '@reduxjs/toolkit';

import spotify from '../../api/spotify.ts';
import { loadSavedPlaylistData } from '../../routes/playlists/slice/thunk.ts';
import type { RootState } from '../index.ts';

import { sessionSelectors } from './index.ts';
import { Authentication } from './model/authentication.ts';
import type { User } from './model/user.ts';

export const fetchAuthentication = createAsyncThunk(
  'session/authenticate',
  async (code: string) => {
    const clientID = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const appToken = window.btoa(
      decodeURIComponent(encodeURIComponent(`${clientID}:${clientSecret}`)),
    );

    const formData = new URLSearchParams();
    formData.append('code', code);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', 'http://localhost:5173');

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + appToken,
    };

    const authenticationResponse = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        body: formData,
        headers: headers,
      },
    );
    const json = await authenticationResponse.json();
    const accessToken = json['access_token'];
    const tokenType = json['token_type'];
    const scope = json['scope'];
    const expiresIn = json['expires_in'];
    const refreshToken = json['refresh_token'];

    return {
      accessToken,
      tokenType,
      scope,
      expiresIn,
      refreshToken,
    } as Authentication;
  },
);

export const fetchUserData = createAsyncThunk(
  'session/fetchUserData',
  async (_, thunkAPI) => {
    const authentication = sessionSelectors.getAuthentication(
      thunkAPI.getState() as RootState,
    );

    const json = await spotify.sendRequest(authentication, 'me');
    const id = json['id'];
    const name = json['display_name'];
    const email = json['email'];
    const imageURL = json['images'][0].url;
    return { id, name, email, imageURL } as User;
  },
);

export const loadSavedUserData = createAsyncThunk(
  'session/loadUserData',
  async (userID: string) => {
    const { user, darkMode } = JSON.parse(localStorage.getItem(userID) ?? '');

    return { user: user as User, darkMode };
  },
);

export const saveData = createAsyncThunk(
  'session/save',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userID = sessionSelectors.getUserID(state);
    const { user, darkMode } = state.session;

    const playlistByPlaylistID = Object.entries(
      state.playlist.playlistByPlaylistID,
    );

    localStorage.setItem(
      userID,
      JSON.stringify({ playlistByPlaylistID, user, darkMode }),
    );

    const savedUsers = JSON.parse(
      localStorage.getItem('savedUsers') ?? '[]',
    ) as string[];
    if (savedUsers.indexOf(userID) !== -1) return;
    savedUsers.push(userID);
    localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
  },
);

export const loadData = createAsyncThunk(
  'session/load',
  async (userID: string, thunkAPI) => {
    await Promise.all([
      thunkAPI.dispatch(loadSavedUserData(userID)),
      thunkAPI.dispatch(loadSavedPlaylistData(userID)),
    ]);
  },
);
