import { createAsyncThunk } from '@reduxjs/toolkit';

import spotify from '../../api/spotify.ts';
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
