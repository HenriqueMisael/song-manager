import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../store';
import { sessionSelectors } from '../store/session';
import { fetchUserData } from '../store/session/thunk.ts';

export function useUserData() {
  const [, setQueryString] = useSearchParams();

  const isLoading = useSelector(sessionSelectors.getFetching);
  const isAuthenticated = useSelector(sessionSelectors.isAuthenticated);
  const isLogged = useSelector(sessionSelectors.isLogged);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (isLoading) return;
    if (isLogged) return;
    dispatch(fetchUserData());
  }, [dispatch, isAuthenticated, isLoading, isLogged]);

  useEffect(() => {
    console.log(isLogged);
    if (!isLogged) return;
    setQueryString({});
  }, [isLogged, setQueryString]);
}
