import { FC, useState } from 'react';

import { Container, Space, Stack, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import {
  CollectionFormModal,
  LargeCollections,
  LastAddedItems,
  TagsCloud,
} from './components';

import { CollectionType } from 'api';

export const Main: FC = () => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionForEdit, setCollectionForEdit] = useState<CollectionType | null>(null);

  return (
    <Container size="xl">
      <Space h="xl" />
      <Stack spacing="xl">
        <Stack spacing="xs">
          <Title ml={8} order={4}>
            {t('main_page_title_items')}
          </Title>
          <LastAddedItems />
        </Stack>
        <Stack spacing="xs">
          <Title ml={8} order={4}>
            {t('main_page_title_collections')}
          </Title>
          <LargeCollections
            setCollectionForEdit={setCollectionForEdit}
            setIsModalOpen={setIsModalOpen}
          />
        </Stack>
        <TagsCloud />
      </Stack>
      <Space h="md" />
      <CollectionFormModal
        collectionForEdit={collectionForEdit}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </Container>
  );
};
