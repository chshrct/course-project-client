import { ColorScheme } from '@mantine/core';

export type LanguageType = 'ru' | 'en';

export type AppStateType = {
  colorScheme: ColorScheme;
  language: LanguageType;
};
