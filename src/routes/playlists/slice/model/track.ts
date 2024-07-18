import type { AudioFeatures } from './audio-features.ts';

export interface Track {
  audioFeatures: AudioFeatures;
  id: string;
  name: string;
  popularity: number;
  uri: string;
}
