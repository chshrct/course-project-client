import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppStateType, ErrorType } from './types';

import { appApi } from 'shared/api';

const initialState: AppStateType = {
  colorScheme: 'light',
  locale: 'en',
  userData: {
    id: '',
    name: '',
    access: 'basic',
    token: '',
    rememberMe: false,
  },
  error: {
    title: '',
    message: '',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserAccessBasic: state => {
      state.userData.access = 'basic';
    },
    toggleColorScheme: state => {
      state.colorScheme = state.colorScheme === 'dark' ? 'light' : 'dark';
    },
    toggleLocale: state => {
      state.locale = state.locale === 'en' ? 'ru' : 'en';
    },
    signOut: state => {
      state.userData.id = '';
      state.userData.name = '';
      state.userData.access = 'basic';
      state.userData.token = '';
    },
    setRememberMe: (state, { payload }: PayloadAction<boolean>) => {
      state.userData.rememberMe = payload;
    },
    setError: (state, { payload }: PayloadAction<ErrorType>) => {
      state.error = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      appApi.endpoints.authCheck.matchFulfilled,
      (state, { payload: { access, id, name } }) => {
        state.userData.access = access;
        state.userData.id = id;
        state.userData.name = name;
      },
    );
    builder.addMatcher(
      appApi.endpoints.signIn.matchFulfilled,
      (state, { payload: { access, id, name, token } }) => {
        state.userData.access = access;
        state.userData.id = id;
        state.userData.name = name;
        state.userData.token = token;
      },
    );
  },
});

export const appReducer = appSlice.reducer;
export const {
  toggleColorScheme,
  toggleLocale,
  signOut,
  setRememberMe,
  setError,
  setUserAccessBasic,
} = appSlice.actions;
