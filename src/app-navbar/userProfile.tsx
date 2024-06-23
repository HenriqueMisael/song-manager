import { Text } from '@blueprintjs/core';
import { useSelector } from 'react-redux';

import { sessionSelectors } from '../store/session';

import useLoginAction from './useLoginAction.ts';

export const UserProfile = () => {
  const name = useSelector(sessionSelectors.getUserName);
  const imageURL = useSelector(sessionSelectors.getUserImageURL);
  const isAuthenticated = useSelector(sessionSelectors.isAuthenticated);

  const filter = isAuthenticated ? '' : 'grayscale(0.5)';
  const title = isAuthenticated ? 'Authenticated user' : 'Offline user';

  const handleClick = useLoginAction();

  return (
    <div
      onClick={handleClick}
      className="bp5-button bp5-minimal flex place-content-center gap-1 h-5/6"
      style={{ filter }}
      title={title}
    >
      <img className="h-full" src={imageURL} alt="User profile image"></img>
      <Text className="place-content-center">{name}</Text>
    </div>
  );
};
