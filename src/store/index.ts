import { configureStore } from '@reduxjs/toolkit';
import { throttle } from 'lodash';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { errorMiddleware } from './errorMiddleware';

import { appApi, fileUploadApi } from 'api';
import { appReducer } from 'app/appSlice/appSlice';
import { loadState, saveItem } from 'utils';

const SAVE_THROTTLE = 1000;

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    [fileUploadApi.reducerPath]: fileUploadApi.reducer,
    app: appReducer,
  },
  preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(appApi.middleware)
      .concat(fileUploadApi.middleware)
      .concat(errorMiddleware),
});

store.subscribe(
  throttle(() => {
    saveItem('colorScheme', store.getState().app.colorScheme, true);
    saveItem('locale', store.getState().app.locale, true);
    saveItem(
      'token',
      store.getState().app.userData.token,
      store.getState().app.userData.rememberMe,
    );
  }, SAVE_THROTTLE),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
