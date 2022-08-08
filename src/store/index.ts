import { configureStore } from '@reduxjs/toolkit';
import { throttle } from 'lodash';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { appApi } from 'api';
import { appReducer } from 'app/appSlice/appSlice';
import { loadState, saveItem } from 'utils';

const SAVE_THROTTLE = 1000;

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    app: appReducer,
  },
  preloadedState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(appApi.middleware),
});

store.subscribe(
  throttle(() => {
    saveItem('colorScheme', store.getState().app.colorScheme, true);
    saveItem('language', store.getState().app.locale, true);
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
