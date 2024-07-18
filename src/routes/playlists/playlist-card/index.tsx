import { Card, Divider, H4, Text } from '@blueprintjs/core';
import { memo } from 'react';

import { useSelector } from '../../../store';
import { playlistSelectors } from '../slice';

import AnalysePlaylistButton from './analyse-playlist-button.tsx';
import AudioAnalysisSection from './audio-analysis-section.tsx';

interface Props {
  playlistID: string;
}

const PlaylistCard = memo<Props>(({ playlistID }) => {
  const playlist = useSelector(
    (state) => playlistSelectors.getPlaylistByPlaylistID(state)[playlistID],
  );

  return !playlist ? null : (
    <Card>
      <header>
        <H4>
          <Text ellipsize>{playlist.name}</Text>
        </H4>
      </header>
      <Divider />
      {playlist.averageAudioAnalysis != null &&
      playlist.lowerAudioAnalysis != null &&
      playlist.higherAudioAnalysis != null ? (
        <AudioAnalysisSection
          lower={playlist.lowerAudioAnalysis}
          average={playlist.averageAudioAnalysis}
          higher={playlist.higherAudioAnalysis}
        />
      ) : (
        <AnalysePlaylistButton playlistID={playlistID} />
      )}
    </Card>
  );
});

export default PlaylistCard;
