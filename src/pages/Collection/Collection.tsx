import { FC, useEffect } from 'react';

import { Container, LoadingOverlay, Space } from '@mantine/core';
import { useParams } from 'react-router-dom';

import { CollectionInfo } from './CollectionInfo';

import { useLazyGetCollectionQuery } from 'shared/api';

export const Collection: FC = () => {
  const { id } = useParams();
  const [getCollection, { data: collectionData, isFetching: isCollectionFetching }] =
    useLazyGetCollectionQuery();

  useEffect(() => {
    if (id) getCollection({ id });
  }, [getCollection, id]);

  return (
    <Container>
      <LoadingOverlay visible={isCollectionFetching} overlayBlur={2} />
      <Space h="xl" />
      {collectionData && <CollectionInfo collectionData={collectionData} />}
    </Container>
  );
};
