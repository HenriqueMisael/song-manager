import { Button } from '@blueprintjs/core';
import { useLocation } from 'react-router-dom';

export const LoginButton = () => {
  const currentRoute = useLocation().pathname;

  const handleClick = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: 'http://localhost:5173',
      state: currentRoute,
    });

    window.location.href =
      'https://accounts.spotify.com/authorize?' + params.toString();
  };

  return (
    <Button className="bp5-minimal" icon="user" onClick={handleClick}>
      Login
    </Button>
  );
};
