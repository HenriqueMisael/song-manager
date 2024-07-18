import { Spinner } from '@blueprintjs/core';

import { usePlaylists } from './hooks.ts';
import PlaylistCard from './playlist-card';

const PlaylistsRoute = () => {
  const [isLoading, , playlistIDs] = usePlaylists();

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-4 gap-2 p-2">
      {playlistIDs.map((playlistID) => (
        <PlaylistCard key={playlistID} playlistID={playlistID} />
      ))}
    </div>
  );
};

export default PlaylistsRoute;
