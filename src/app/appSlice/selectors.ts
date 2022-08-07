import { ColorScheme } from '@mantine/core';

import { RootState } from 'store';

export const selectColorScheme = (state: RootState): ColorScheme => state.app.colorScheme;
