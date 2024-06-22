import type { Authentication } from '../store/session/model/authentication.ts';

async function sendRequest(authentication: Authentication, uri: string) {
  const { tokenType, accessToken } = authentication;
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `${tokenType} ${accessToken}`,
  };
  const response = await fetch(`https://api.spotify.com/v1/${uri}`, {
    headers,
  });
  return response.json();
}

export default Object.freeze({ sendRequest });
