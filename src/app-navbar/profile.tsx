import { useSelector } from 'react-redux';

import { sessionSelectors } from '../store/session';

import { LoginButton } from './loginButton.tsx';
import { UserProfile } from './userProfile.tsx';

export const Profile = () => {
  const isLogged = useSelector(sessionSelectors.isLogged);

  return isLogged ? <UserProfile /> : <LoginButton />;
};
