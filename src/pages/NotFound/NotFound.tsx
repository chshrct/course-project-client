import { FC } from 'react';

import { Center, Container, Image } from '@mantine/core';

import NotFoundImage from 'shared/assets/images/404.jpg';

export const NotFound: FC = () => {
  return (
    <Container>
      <Center sx={{ minHeight: '100vh' }}>
        <Image src={NotFoundImage} />
      </Center>
    </Container>
  );
};
