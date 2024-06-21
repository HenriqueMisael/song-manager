import { useAuth } from '../login/useAuth.tsx';
import { useUserData } from '../login/useUserData.tsx';

const HomeRoute = () => {
  useAuth();
  useUserData();

  return <div />;
};

export default HomeRoute;
