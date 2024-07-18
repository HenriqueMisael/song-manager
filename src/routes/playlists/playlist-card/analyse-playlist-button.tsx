import { Button } from '@blueprintjs/core';
import { memo } from 'react';

import { useAppDispatch } from '../../../store';
import { analysePlaylist } from '../slice/thunk.ts';

interface Props {
  playlistID: string;
}

const AnalysePlaylistButton = memo<Props>(({ playlistID }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(analysePlaylist(playlistID));
  };

  return (
    <Button className="w-full" onClick={handleClick}>
      Analyse playlist tracks
    </Button>
  );
});

export default AnalysePlaylistButton;
