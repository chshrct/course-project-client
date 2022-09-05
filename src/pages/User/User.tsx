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

import { CollectionCardsList, CollectionFormModal } from './components';
import s from './style/User.module.css';
import { getGreetingMessage } from './utils';

import { CollectionType, useGetUserCollectionsQuery, useLazyGetUserNameQuery } from 'api';
import { selectIsAdmin, selectUserId, selectUserName } from 'app';
import { useAppSelector } from 'store';

export const User: FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const userId = useAppSelector(selectUserId);
  const isAdmin = useAppSelector(selectIsAdmin);
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

  const isOwnerOrAdmin = userId === id || isAdmin;

  return (
    <Container size="xl">
      <LoadingOverlay visible={isUserNameFetching} overlayBlur={2} />
      <Space h="md" />
      <Title order={3} align="center">
        {getGreetingMessage(loggedUserName, userNameData)}
      </Title>
      {isOwnerOrAdmin && (
        <ActionIcon
          variant="default"
          onClick={onAddCollectionClick}
          title={t('button_title_addCollection')}
          size={30}
        >
          <IconPlus size={18} />
        </ActionIcon>
      )}
      <Space h="md" />
      <Group align="flex-start" spacing={28} className={s.positionRelative}>
        <LoadingOverlay visible={isFetching && !isUserNameFetching} overlayBlur={2} />
        {collectionsData && (
          <CollectionCardsList
            collectionsData={collectionsData}
            setShowForm={setOpenModal}
            setCollectionForEdit={setCollectionForEdit}
          />
        )}
      </Group>
      <CollectionFormModal
        collectionForEdit={collectionForEdit}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
      <Space h="md" />
    </Container>
  );
};
