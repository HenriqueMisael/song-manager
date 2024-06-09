import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';

import { useAppDispatch } from '../../store';
import { sessionSelectors } from '../../store/session';
import { fetchUserData } from '../../store/session/thunk.ts';

export function useUserData() {
  const queryString = new URLSearchParams(window.location.search);
  const code = queryString.get('code') as string;

  const isLoading = useSelector(sessionSelectors.getFetching);
  const isAuthenticated = useSelector(sessionSelectors.isAuthenticated);
  const isLogged = useSelector(sessionSelectors.isLogged);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (isLoading) return;
    dispatch(fetchUserData());
  }, [code, dispatch, isAuthenticated, isLoading]);

  useEffect(() => {
    if (!isLogged) return;
    redirect('/');
  }, [isLogged]);
}
