import { Spinner, SpinnerSize } from '@blueprintjs/core';

import { useAuth } from '../hooks/useAuth.tsx';
import { useUserData } from '../hooks/useUserData.tsx';

import { LoginButton } from './loginButton.tsx';
import { UserProfile } from './userProfile.tsx';

export const Profile = () => {
  const { isLogged, isLoading } = useUserData();
  useAuth();

  return isLoading ? (
    <Spinner size={SpinnerSize.SMALL} />
  ) : isLogged ? (
    <UserProfile />
  ) : (
    <LoginButton />
  );
};
