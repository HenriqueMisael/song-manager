import { useSelector } from 'react-redux';

import { sessionSelectors } from '../store/session';

import { useAuth } from './useAuth.tsx';
import { useUserData } from './useUserData.tsx';
import { LoginButton } from './loginButton.tsx';
import { UserProfile } from './userProfile.tsx';

export const Profile = () => {
  const isLogged = useSelector(sessionSelectors.isLogged);

  useAuth();
  useUserData();

  return isLogged ? <UserProfile /> : <LoginButton />;
};
