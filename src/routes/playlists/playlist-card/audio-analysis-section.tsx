import { H5 } from '@blueprintjs/core';
import { memo } from 'react';

import type { AudioFeatures } from '../slice/model/audio-features.ts';

import AudioFeatureBar from './AudioFeatureBar.tsx';

interface Props {
  average: AudioFeatures;
  lower: AudioFeatures;
  higher: AudioFeatures;
}

const AudioAnalysisSection = memo<Props>(({ average, lower, higher }) => {
  return (
    <section>
      <header>
        <H5>{average.title}</H5>
      </header>
      <AudioFeatureBar
        name="acousticness"
        lower={lower.acousticness}
        average={average.acousticness}
        higher={higher.acousticness}
      ></AudioFeatureBar>
      <AudioFeatureBar
        name="danceability"
        lower={lower.danceability}
        average={average.danceability}
        higher={higher.danceability}
      ></AudioFeatureBar>
      <AudioFeatureBar
        name="energy"
        lower={lower.energy}
        average={average.energy}
        higher={higher.energy}
      ></AudioFeatureBar>
      <AudioFeatureBar
        name="instrumentalness"
        lower={lower.instrumentalness}
        average={average.instrumentalness}
        higher={higher.instrumentalness}
      ></AudioFeatureBar>
      <AudioFeatureBar
        name="liveness"
        lower={lower.liveness}
        average={average.liveness}
        higher={higher.liveness}
      ></AudioFeatureBar>
      <AudioFeatureBar
        name="loudness"
        lower={lower.loudness}
        average={average.loudness}
        higher={higher.loudness}
      ></AudioFeatureBar>
      <AudioFeatureBar
        name="mode"
        lower={lower.mode}
        average={average.mode}
        higher={higher.mode}
      ></AudioFeatureBar>
      <AudioFeatureBar
        name="speechiness"
        lower={lower.speechiness}
        average={average.speechiness}
        higher={higher.speechiness}
      ></AudioFeatureBar>
      {/*<AudioFeatureBar*/}
      {/*  name="tempo"*/}
      {/*  value={audioAnalysis.tempo}*/}
      {/*></AudioFeatureBar>*/}
      <AudioFeatureBar
        min={3}
        max={7}
        name="time_signature"
        lower={lower.time_signature}
        average={average.time_signature}
        higher={higher.time_signature}
      ></AudioFeatureBar>
      <AudioFeatureBar
        name="valence"
        lower={lower.valence}
        average={average.valence}
        higher={higher.valence}
      ></AudioFeatureBar>
    </section>
  );
});

export default AudioAnalysisSection;
