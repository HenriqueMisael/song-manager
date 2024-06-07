import { createBrowserRouter } from 'react-router-dom';

import HomeRoute from './home';
import LoginRoute from './login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    path: '/login',
    element: <LoginRoute />,
  },
]);
