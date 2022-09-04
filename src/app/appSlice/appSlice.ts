import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppStateType, ErrorType } from './types';

import { authApi } from 'shared/api/auth/authApi';

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
  search: {
    isOpen: false,
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
    toggleIsSearchOpen: state => {
      state.search.isOpen = !state.search.isOpen;
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
      authApi.endpoints.authCheck.matchFulfilled,
      (state, { payload: { access, id, name } }) => {
        state.userData.access = access;
        state.userData.id = id;
        state.userData.name = name;
      },
    );
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, { payload: { access, id, name, token } }) => {
        state.userData.access = access;
        state.userData.id = id;
        state.userData.name = name;
        state.userData.token = token;
      },
    );
    builder.addMatcher(
      authApi.endpoints.githubSignIn.matchFulfilled,
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
  toggleIsSearchOpen,
} = appSlice.actions;
