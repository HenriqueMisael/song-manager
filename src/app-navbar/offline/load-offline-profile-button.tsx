import { memo, useEffect, useState } from 'react';

import StringSelect from '../../components/string-select.tsx';
import { useAppDispatch } from '../../store';
import { loadData } from '../../store/session/thunk.ts';

const LoadOfflineProfileButton = memo(() => {
  const [selectedUser, setSelectedUser] = useState('');
  const savedUsers = JSON.parse(
    localStorage.getItem('savedUsers') ?? '[]',
  ) as string[];

  const dispatch = useAppDispatch();

  const disabled = savedUsers.length === 0;
  const handleSelect = (selectedUser: string) => {
    if (disabled) return;
    localStorage.setItem('selectedUser', selectedUser);
  };

  useEffect(() => {
    if (selectedUser === '') return;
    dispatch(loadData(selectedUser));
  }, [dispatch, selectedUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedUser(localStorage.getItem('selectedUser') ?? '');
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [setSelectedUser]);

  return (
    <StringSelect
      placeholder={'Load offline profile'}
      disabled={disabled}
      className="bp5-minimal"
      onSelect={handleSelect}
      options={savedUsers}
    />
  );
});

export default LoadOfflineProfileButton;
