import { FC, useEffect } from 'react';

import { Container, LoadingOverlay, Space, Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';

import { CollectionInfo, ItemsTable } from './components';

import { useLazyGetCollectionQuery } from 'api';

export const Collection: FC = () => {
  const { id: collectionId } = useParams();
  const [getCollection, { data: collection, isFetching: isCollectionFetching }] =
    useLazyGetCollectionQuery();

  useEffect(() => {
    if (collectionId) getCollection({ collectionId });
  }, [getCollection, collectionId]);

  if (!collection || !collectionId) return null;

  const collectionData = {
    collectionId,
    itemFields: collection.itemFields,
    owner: collection.owner.id,
  };

  return (
    <Container size="xl">
      <Space h="md" />
      <Stack spacing="md">
        <LoadingOverlay visible={isCollectionFetching} overlayBlur={2} />
        <CollectionInfo collection={collection} />
        <ItemsTable collectionData={collectionData} />
      </Stack>
      <Space h="md" />
    </Container>
  );
};
