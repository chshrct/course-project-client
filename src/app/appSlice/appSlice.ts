import { createSlice } from '@reduxjs/toolkit';

import { AppStateType } from './types';

const initialState: AppStateType = {
  colorScheme: 'light',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleColorScheme: state => {
      state.colorScheme = state.colorScheme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const appReducer = appSlice.reducer;
export const { toggleColorScheme } = appSlice.actions;
