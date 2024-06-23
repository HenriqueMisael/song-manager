import { Alignment, Navbar } from '@blueprintjs/core';

import OfflineProfile from './offline';
import { Profile } from './profile.tsx';
import RouteButton from './route-button.tsx';
import ThemeButton from './theme-button.tsx';

const AppNavbar = () => {
  return (
    <Navbar fixedToTop>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Song Manager</Navbar.Heading>
        <Navbar.Divider />
        <RouteButton name="Home" to="/" icon="home"></RouteButton>
        <RouteButton name="Playlists" to="/playlists" icon="list"></RouteButton>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <OfflineProfile />
        <Profile />
        <Navbar.Divider />
        <ThemeButton />
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNavbar;
