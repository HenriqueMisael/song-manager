import { Button } from '@blueprintjs/core';

export const LoginButton = () => {
  const onLogin = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: 'http://localhost:5173/login',
    });

    window.location.href =
      'https://accounts.spotify.com/authorize?' + params.toString();
  };

  return (
    <Button className="bp5-minimal" icon="user" onClick={onLogin}>
      Login
    </Button>
  );
};
