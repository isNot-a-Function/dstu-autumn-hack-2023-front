import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authServices';
import { userApi } from '../services/userServices';
import { rustApi } from '../services/rustServices';
import { customPageApi } from '../services/customPageServices';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [rustApi.reducerPath]: rustApi.reducer,
    [customPageApi.reducerPath]: customPageApi.reducer,
  },
  middleware: getDefaultMiddlware =>
    getDefaultMiddlware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(rustApi.middleware)
      .concat(customPageApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
