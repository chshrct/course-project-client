import { ColorScheme } from '@mantine/core';

import { LanguageType } from './types';

import { UserAccessType } from 'api/types';
import { RootState } from 'store';

export const selectColorScheme = (state: RootState): ColorScheme => state.app.colorScheme;
export const selectIsDark = (state: RootState): boolean =>
  state.app.colorScheme === 'dark';
export const selectLocale = (state: RootState): LanguageType => state.app.locale;
export const selectIsEnglish = (state: RootState): boolean => state.app.locale === 'en';
export const selectUserId = (state: RootState): string => state.app.userData.id;
export const selectUserAccess = (state: RootState): UserAccessType =>
  state.app.userData.access;
export const selectIsAdmin = (state: RootState): boolean =>
  selectUserAccess(state) === 'admin';
export const selectUserName = (state: RootState): string => state.app.userData.name;
export const selectToken = (state: RootState): string => state.app.userData.token;
export const selectIsSignedIn = (state: RootState): boolean =>
  Boolean(selectUserId(state));
export const selectErrorTitle = (state: RootState): string => state.app.error.title;
export const selectErrorMessage = (state: RootState): string => state.app.error.message;
