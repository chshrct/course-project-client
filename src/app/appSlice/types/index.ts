import { ColorScheme } from '@mantine/core';

import { UserAccessType } from 'api/types';

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
};
