import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../../store';
import { sessionSelectors } from '../../store/session';
import { fetchUserData } from '../../store/session/thunk.ts';

export function useUserData() {
  const [queryString, setQueryString] = useSearchParams();
  const code = queryString.get('code') as string;

  const isLoading = useSelector(sessionSelectors.getFetching);
  const isAuthenticated = useSelector(sessionSelectors.isAuthenticated);
  const isLogged = useSelector(sessionSelectors.isLogged);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (isLoading) return;
    if (isLogged) return;
    dispatch(fetchUserData());
  }, [code, dispatch, isAuthenticated, isLoading, isLogged]);

  useEffect(() => {
    if (!isLogged) return;
    setQueryString({});
  }, [isLogged, setQueryString]);
}
