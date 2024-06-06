import { Alignment, Button, Navbar } from "@blueprintjs/core";

import ThemeButton from "./theme-button.tsx";

const AppNavbar = () => {

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Song Manager</Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp5-minimal" icon="home">Home</Button>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <ThemeButton />
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNavbar;