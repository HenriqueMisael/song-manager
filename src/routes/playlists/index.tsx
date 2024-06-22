import { Spinner } from '@blueprintjs/core';

import { usePlaylists } from './hooks.ts';

const PlaylistsRoute = () => {
  const [isLoading, , playlists] = usePlaylists();

  return isLoading ? (
    <Spinner />
  ) : (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  );
};

export default PlaylistsRoute;
