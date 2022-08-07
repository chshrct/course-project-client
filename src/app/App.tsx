import { FC, useState } from 'react';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';

import './App.css';
import { Test } from 'pages/Test';

export const App: FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme): void =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Test />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
