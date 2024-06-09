import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import session from './session';

const store = configureStore({
  reducer: { session },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
