import { createBrowserRouter } from 'react-router-dom';

import HomeRoute from './home';
import PlaylistsRoute from './playlists';
import RootRoute from './root';

export const router = createBrowserRouter([
  {
    element: <RootRoute />,
    children: [
      {
        path: '/',
        element: <HomeRoute />,
      },
      {
        path: '/playlists',
        element: <PlaylistsRoute />,
      },
    ],
  },
]);
