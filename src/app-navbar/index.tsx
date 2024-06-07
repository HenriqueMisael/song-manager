import { Alignment, Button, Navbar } from "@blueprintjs/core";

import ThemeButton from "./theme-button.tsx";
import { Profile } from "./profile.tsx";

const AppNavbar = () => {

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Song Manager</Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp5-minimal" icon="home">Home</Button>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Profile />
        <Navbar.Divider />
        <ThemeButton />
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNavbar;