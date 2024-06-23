import { Button, Spinner } from '@blueprintjs/core';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../store';
import { sessionSelectors } from '../../store/session';
import { saveData } from '../../store/session/thunk.ts';

const SaveOfflineProfileButton = () => {
  const isSaving = useSelector(sessionSelectors.isSavingData);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(saveData());
  };

  return isSaving ? (
    <Spinner />
  ) : (
    <Button className="bp5-minimal" icon="import" onClick={handleClick}>
      Save profile
    </Button>
  );
};

export default SaveOfflineProfileButton;
