import type { AudioFeatures } from './audio-features.ts';
import type { Track } from './track.ts';

export interface Playlist {
  name: string;
  id: string;
  description: string;
  imageURI: string;
  trackCount: number;
  tracks: Track[];
  lowerAudioAnalysis: AudioFeatures | null;
  averageAudioAnalysis: AudioFeatures | null;
  higherAudioAnalysis: AudioFeatures | null;
}
