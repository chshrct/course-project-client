import { FC, useEffect } from 'react';

import { Container, LoadingOverlay, Space } from '@mantine/core';
import { useParams } from 'react-router-dom';

import { CollectionInfo } from './CollectionInfo';
import { ItemsTable } from './ItemsTable';

import { useLazyGetCollectionQuery } from 'shared/api';

export const Collection: FC = () => {
  const { id } = useParams();
  const [getCollection, { data: collectionData, isFetching: isCollectionFetching }] =
    useLazyGetCollectionQuery();

  useEffect(() => {
    if (id) getCollection({ id });
  }, [getCollection, id]);

  if (!collectionData || !id) return null;

  return (
    <Container size="xl">
      <LoadingOverlay visible={isCollectionFetching} overlayBlur={2} />
      <Space h="xl" />
      <CollectionInfo collectionData={collectionData} />
      <Space h="md" />
      <ItemsTable id={id} itemFields={collectionData.itemFields} />
      <Space h="md" />
    </Container>
  );
};
