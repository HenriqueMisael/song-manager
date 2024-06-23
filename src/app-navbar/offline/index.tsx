import { Spinner, SpinnerSize } from '@blueprintjs/core';
import { useSelector } from 'react-redux';

import { sessionSelectors } from '../../store/session';

import LoadOfflineProfileButton from './load-offline-profile-button.tsx';
import SaveOfflineProfileButton from './save-offline-profile-button.tsx';

const OfflineProfile = () => {
  const isLogged = useSelector(sessionSelectors.isLogged);
  const isLoadingSavedData = useSelector(sessionSelectors.isLoadingSavedData);

  return isLogged ? (
    <SaveOfflineProfileButton />
  ) : isLoadingSavedData ? (
    <div>
      <Spinner size={SpinnerSize.SMALL} />
      Loading saved data
    </div>
  ) : (
    <LoadOfflineProfileButton />
  );
};

export default OfflineProfile;
