import React, { FC } from 'react';

import { ActionIcon, Group, Text } from '@mantine/core';
import { IconThumbUp } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { PropsType } from './types';

import { useCreateLikeMutation, useDeteleLikeMutation, useGetItemLikesQuery } from 'api';
import { selectIsSignedIn, selectUserId } from 'app';
import { useAppSelector } from 'store';

export const LikeInfo: FC<PropsType> = ({ item }) => {
  const { t } = useTranslation();
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const user = useAppSelector(selectUserId);
  const { data: likesData, isFetching: isLikesFetching } = useGetItemLikesQuery(
    {
      id: item,
    },
    { refetchOnMountOrArgChange: true },
  );
  const [createLike] = useCreateLikeMutation();
  const [deleteLike] = useDeteleLikeMutation();
  const isLiked = likesData?.users.includes(user);
  const likesCount = likesData?.users.length;
  const loading = isLikesFetching;

  const onLikeClick = (): void => {
    if (isLiked) {
      deleteLike({ item, user });

      return;
    }
    createLike({ item, user });
  };

  return (
    <Group spacing="xs">
      <ActionIcon
        variant="transparent"
        onClick={onLikeClick}
        title={isLiked ? t('button_text_unlike') : t('button_text_like')}
        size={23}
        disabled={loading || !isSignedIn}
      >
        <IconThumbUp size={20} fill={isLiked ? 'yellow' : 'white'} />
      </ActionIcon>
      <Text>{likesCount}</Text>
    </Group>
  );
};
