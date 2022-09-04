import { ColorScheme } from '@mantine/core';

import { UserAccessType } from 'api';

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
  search: {
    isOpen: boolean;
  };
};

export type ErrorType = {
  title: string;
  message: string;
};
