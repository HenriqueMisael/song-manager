import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAuth } from '../../hooks/useAuth.tsx';
import { useAppDispatch } from '../../store';

import { playlistSelectors } from './slice';
import { fetchPlaylists } from './slice/thunk.ts';

export function usePlaylists() {
  const playlistIDs = useSelector(playlistSelectors.getPlaylistIDs);
  const status = useSelector(playlistSelectors.getStatus);
  const isLoaded = useSelector(playlistSelectors.isLoaded);
  const isLoading = useSelector(playlistSelectors.isFetching);

  const { isLoading: isLoadingAuthentication, isAuthenticated } = useAuth();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isAuthenticated) return;
    if (isLoaded) return;
    if (isLoading) return;
    dispatch(fetchPlaylists());
  }, [dispatch, isAuthenticated, isLoaded, isLoading, status]);

  return [isLoading || isLoadingAuthentication, isLoaded, playlistIDs] as const;
}
