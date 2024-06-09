import { Spinner } from '@blueprintjs/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { sessionSelectors } from '../../store/session';

import { useAuth } from './useAuth.tsx';
import { useUserData } from './useUserData.tsx';

const LoginRoute = () => {
  useAuth();
  useUserData();

  const isLogged = useSelector(sessionSelectors.isLogged);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) return;
    navigate('/');
  }, [isLogged, navigate]);

  return (
    <div>
      <Spinner />
    </div>
  );
};

export default LoginRoute;
