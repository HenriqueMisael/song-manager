import { useLocation } from 'react-router-dom';

function useLoginAction() {
  const currentRoute = useLocation().pathname;
  return () => {
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
}

export default useLoginAction;
