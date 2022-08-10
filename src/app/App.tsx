import { FC, useEffect } from 'react';

import { LoadingOverlay, MantineProvider } from '@mantine/core';

import { useLazyAuthCheckQuery } from 'api';
import { selectColorScheme, selectIsSignedIn, selectToken } from 'app';
import { AppRouter } from 'routes';
import { useAppSelector } from 'store';

export const App: FC = () => {
  const colorScheme = useAppSelector(selectColorScheme);
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const token = useAppSelector(selectToken);
  const [authCheck, { isFetching }] = useLazyAuthCheckQuery();

  useEffect(() => {
    if (!isSignedIn && token) authCheck();
  }, [authCheck, isSignedIn, token]);

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <LoadingOverlay
        visible={isFetching}
        overlayBlur={2}
        loaderProps={{ variant: 'bars', size: 'lg' }}
      />
      <AppRouter />
    </MantineProvider>
  );
};

export default App;
