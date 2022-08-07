import { ColorScheme } from '@mantine/core';

import { LanguageType } from './types';

import { RootState } from 'store';

export const selectColorScheme = (state: RootState): ColorScheme => state.app.colorScheme;
export const selectLanguage = (state: RootState): LanguageType => state.app.language;
