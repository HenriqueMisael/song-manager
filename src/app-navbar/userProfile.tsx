import { Text } from '@blueprintjs/core';
import { useSelector } from 'react-redux';

import { sessionSelectors } from '../store/session';

export const UserProfile = () => {
  const name = useSelector(sessionSelectors.getUserName);
  const imageURL = useSelector(sessionSelectors.getUserImageURL);
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '60%' }}>
      <img
        style={{ height: '100%' }}
        src={imageURL}
        alt="User profile image"
      ></img>
      <Text style={{ paddingLeft: 5 }}>{name}</Text>
    </div>
  );
};
