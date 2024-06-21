import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../store';
import { sessionSelectors } from '../store/session';
import { fetchAuthentication } from '../store/session/thunk.ts';

export function useAuth() {
  const startedAuthRef = useRef<boolean>();

  const [queryString] = useSearchParams();
  const code = queryString.get('code');

  const isLoading = useSelector(sessionSelectors.isLoadingAuthentication);
  const isAuthenticated = useSelector(sessionSelectors.isAuthenticated);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (code == null) return;
    if (startedAuthRef.current) return;
    if (isLoading || isAuthenticated) return;
    startedAuthRef.current = true;
    dispatch(fetchAuthentication(code));
  }, [code, dispatch, isAuthenticated, isLoading]);
}
