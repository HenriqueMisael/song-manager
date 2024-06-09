import { createAsyncThunk } from '@reduxjs/toolkit';

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
    formData.append('redirect_uri', 'http://localhost:5173/login');

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
    const { tokenType, accessToken } = sessionSelectors.getAuthentication(
      thunkAPI.getState() as RootState,
    );

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `${tokenType} ${accessToken}`,
    };
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers,
    });
    const json = await userResponse.json();
    const name = json['display_name'];
    const email = json['email'];
    const imageURL = json['images'][0].url;
    return { name, email, imageURL } as User;
  },
);
