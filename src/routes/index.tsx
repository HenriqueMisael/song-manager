import { createBrowserRouter } from 'react-router-dom';

import AppNavbar from '../app-navbar';

import HomeRoute from './home';

export const router = createBrowserRouter([
  {
    element: <AppNavbar />,
    children: [
      {
        path: '/',
        element: <HomeRoute />,
      },
    ],
  },
]);
