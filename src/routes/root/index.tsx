import { Outlet } from 'react-router-dom';

import AppNavbar from '../../app-navbar';

const RootRoute = () => {
  return (
    <div className="pt-[50px]">
      <AppNavbar />
      <Outlet />
    </div>
  );
};

export default RootRoute;
