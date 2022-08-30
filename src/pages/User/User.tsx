import { FC, useEffect, useState } from 'react';

import {
  ActionIcon,
  Container,
  Group,
  LoadingOverlay,
  Space,
  Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CollectionCardsList } from './CollectionCardsList';
import { CollectionForm } from './CollectionForm';
import s from './style/User.module.css';
import { getGreetingMessage } from './utils';

import { selectUserName } from 'app';
import { useGetUserCollectionsQuery, useLazyGetUserNameQuery } from 'shared/api';
import { CollectionType } from 'shared/api/collections/types';
import { AppModal } from 'shared/components';
import { useAppSelector } from 'store';

export const User: FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const loggedUserName = useAppSelector(selectUserName);
  const [openModal, setOpenModal] = useState(false);
  const [collectionForEdit, setCollectionForEdit] = useState<CollectionType | null>(null);
  const { data: collectionsData, isFetching } = useGetUserCollectionsQuery(
    { userId: id! },
    { refetchOnMountOrArgChange: true },
  );
  const [getUserName, { data: userNameData, isFetching: isUserNameFetching }] =
    useLazyGetUserNameQuery();

  useEffect(() => {
    if (id) getUserName({ id });
  }, [getUserName, id]);

  const onAddCollectionClick = (): void => {
    setCollectionForEdit(null);
    setOpenModal(true);
  };

  return (
    <Container>
      <LoadingOverlay visible={isUserNameFetching} overlayBlur={2} />
      <Space h="md" />
      <Title order={3} align="center">
        {getGreetingMessage(loggedUserName, userNameData, t)}
      </Title>
      <ActionIcon
        variant="default"
        onClick={onAddCollectionClick}
        title={t('button_title_addCollection')}
        size={30}
      >
        <IconPlus size={18} />
      </ActionIcon>
      <Space h="md" />
      <Group align="flex-start" spacing="xs" className={s.positionRelative}>
        <LoadingOverlay visible={isFetching && !isUserNameFetching} overlayBlur={2} />
        {collectionsData && (
          <CollectionCardsList
            collectionsData={collectionsData}
            setShowForm={setOpenModal}
            setCollectionForEdit={setCollectionForEdit}
          />
        )}
      </Group>
      <AppModal
        title={
          collectionForEdit
            ? t('modal_title_editCollection')
            : t('modal_title_createCollection')
        }
        setOpenModal={setOpenModal}
        openModal={openModal}
      >
        <CollectionForm setShowForm={setOpenModal} collection={collectionForEdit} />
      </AppModal>
    </Container>
  );
};
