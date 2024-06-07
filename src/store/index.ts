import { configureStore } from '@reduxjs/toolkit';

import session from './session';
import { fetchAuthentication } from './session/thunk.ts';

const store = configureStore({
  reducer: { session },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: fetchAuthentication,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
