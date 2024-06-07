import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '@blueprintjs/core';
import { useEffect } from 'react';

import { sessionSelectors } from '../../store/session';
import { fetchAuthentication } from '../../store/session/thunk.ts';
import useSWR from "swr";

function useFetchUserData() {
    const token = // pega da rota da página
    const dispatch = useDispatch() // do redux
    const { data, isLoading } = useSWR(``, () => {
      // chama fetch com o token e reorna
    });
    dispatch({action: 'ACTION', payload: { data, isLoading }})
}

const LoginRoute = () => {
  const queryString = new URLSearchParams(window.location.search);
  const redirect = queryString.get('state') as string;
  const fetching = useSelector(sessionSelectors.getFetching);
  const code = queryString.get('code') as string;
  const dispatch = useDispatch();

  useFetchUserData();

  return (
    <div>
      <Spinner />
      {'Retrieving ' + fetching}
    </div>
  );
};

export default LoginRoute;
