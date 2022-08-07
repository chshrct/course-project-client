import { FC } from 'react';

import { MantineProvider } from '@mantine/core';

import { selectColorScheme } from 'app';
import { Test } from 'pages';
import { useAppSelector } from 'store';

export const App: FC = () => {
  const colorScheme = useAppSelector(selectColorScheme);

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <Test />
    </MantineProvider>
  );
};

export default App;
