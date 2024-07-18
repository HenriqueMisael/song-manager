import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';

import playlist from '../routes/playlists/slice';

import session from './session';

const store = configureStore({
  reducer: { session, playlist },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useSelector = useReduxSelector.withTypes<RootState>();

export default store;
