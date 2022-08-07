import { FC } from 'react';

import { MantineProvider } from '@mantine/core';

import { selectColorScheme } from 'app';
import { AppRouter } from 'routes';
import { useAppSelector } from 'store';

export const App: FC = () => {
  const colorScheme = useAppSelector(selectColorScheme);

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <AppRouter />
    </MantineProvider>
  );
};

export default App;
