export interface AudioFeatures {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  valence: number;
}

export function newAudioFeatures(initial = 0): AudioFeatures {
  return {
    acousticness: initial,
    danceability: initial,
    energy: initial,
    instrumentalness: initial,
    liveness: initial,
    loudness: initial,
    mode: initial,
    speechiness: initial,
    tempo: initial,
    time_signature: initial,
    valence: initial,
  };
}
