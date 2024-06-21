import { useAuth } from './useAuth.tsx';
import { useUserData } from './useUserData.tsx';

const HomeRoute = () => {
  useAuth();
  useUserData();

  return <div />;
};

export default HomeRoute;
