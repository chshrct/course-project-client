import { ColorScheme } from '@mantine/core';

import { UserAccessType } from 'shared/api/types';

export type LanguageType = 'ru' | 'en';

export type AppStateType = {
  colorScheme: ColorScheme;
  locale: LanguageType;
  userData: {
    access: UserAccessType;
    id: string;
    name: string;
    token: string;
    rememberMe: boolean;
  };
  error: ErrorType;
};

export type ErrorType = {
  title: string;
  message: string;
};
