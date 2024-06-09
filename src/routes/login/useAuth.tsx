import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../store';
import { sessionSelectors } from '../../store/session';
import { fetchAuthentication } from '../../store/session/thunk.ts';

export function useAuth() {
  const staredAuthRef = useRef<boolean>();

  const queryString = new URLSearchParams(window.location.search);
  const code = queryString.get('code') as string;

  const isLoading = useSelector(sessionSelectors.isLoadingAuthentication);
  const isAuthenticated = useSelector(sessionSelectors.isAuthenticated);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (staredAuthRef.current) return;
    if (isLoading || isAuthenticated) return;
    staredAuthRef.current = true;
    dispatch(fetchAuthentication(code));
  }, [code, dispatch, isAuthenticated, isLoading]);
}
