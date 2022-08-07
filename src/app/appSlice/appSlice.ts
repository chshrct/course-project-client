import { createSlice } from '@reduxjs/toolkit';

import { AppStateType } from './types';

const initialState: AppStateType = {
  colorScheme: 'light',
  language: 'en',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleColorScheme: state => {
      state.colorScheme = state.colorScheme === 'dark' ? 'light' : 'dark';
    },
    toggleLanguage: state => {
      state.language = state.language === 'en' ? 'ru' : 'en';
    },
  },
});

export const appReducer = appSlice.reducer;
export const { toggleColorScheme, toggleLanguage } = appSlice.actions;
