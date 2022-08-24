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
import { CollectionFormModal } from './CollectionFormModal';
import s from './style/User.module.css';
import { getGreetingMessage } from './utils';

import { selectUserName } from 'app';
import { useGetUserCollectionsQuery, useLazyGetUserNameQuery } from 'shared/api';
import { CollectionType } from 'shared/api/collections/types';
import { useAppSelector } from 'store';

export const User: FC = () => {
  const loggedUserName = useAppSelector(selectUserName);
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();
  const [collectionForEdit, setCollectionForEdit] = useState<CollectionType | null>(null);
  const { id } = useParams();
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
    setShowForm(true);
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
            setShowForm={setShowForm}
            setCollectionForEdit={setCollectionForEdit}
          />
        )}
      </Group>
      <CollectionFormModal
        collectionForEdit={collectionForEdit}
        setShowForm={setShowForm}
        showForm={showForm}
      />
    </Container>
  );
};
