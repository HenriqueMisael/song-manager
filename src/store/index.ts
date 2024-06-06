import { configureStore } from "@reduxjs/toolkit";

import session from "./session";

const store = configureStore({
  reducer: { session }
});

export type RootState = ReturnType<typeof store.getState>

export default store;
