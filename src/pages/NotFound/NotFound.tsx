import { FC } from 'react';

import { Center, Container, Image } from '@mantine/core';

import s from './style/NotFound.module.css';

import NotFoundImage from 'shared/assets/images/404.jpg';

export const NotFound: FC = () => {
  return (
    <Container>
      <Center className={s.conteinerHeight}>
        <Image src={NotFoundImage} />
      </Center>
    </Container>
  );
};
