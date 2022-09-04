import { FC, useState } from 'react';

import { Container, Space, Stack, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { LargeCollections } from './LargeCollections';
import { LastAddedItems } from './LastAddedItems';
import { TagsCloud } from './TagsCloud';

import { CollectionType } from 'api/collections/types';
import { AppModal, CollectionForm } from 'components';

export const Main: FC = () => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionForEdit, setCollectionForEdit] = useState<CollectionType | null>(null);

  return (
    <>
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
      </Container>
      <AppModal
        title={
          collectionForEdit
            ? t('modal_title_editCollection')
            : t('modal_title_createCollection')
        }
        setOpenModal={setIsModalOpen}
        openModal={isModalOpen}
      >
        <CollectionForm setShowForm={setIsModalOpen} collection={collectionForEdit} />
      </AppModal>
    </>
  );
};
