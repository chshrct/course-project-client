import React, { FC } from 'react';

import { ActionIcon, Group, Text } from '@mantine/core';
import { IconThumbUp } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { selectUserId } from 'app';
import {
  useCreateLikeMutation,
  useDeteleLikeMutation,
  useGetItemLikesQuery,
} from 'shared/api';
import { useAppSelector } from 'store';

type PropsType = {
  item: string;
};

export const LikeInfo: FC<PropsType> = ({ item }) => {
  const { t } = useTranslation();
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

  const onLikeClick = (): void => {
    if (isLiked) {
      deleteLike({ item, user });

      return;
    }
    createLike({ item, user });
  };
  const loading = isLikesFetching;

  return (
    <Group spacing="xs">
      <ActionIcon
        variant="transparent"
        onClick={onLikeClick}
        title={isLiked ? t('button_text_unlike') : t('button_text_like')}
        size={23}
        disabled={loading}
      >
        <IconThumbUp size={20} fill={isLiked ? 'yellow' : 'white'} />
      </ActionIcon>
      <Text>{likesData?.users.length}</Text>
    </Group>
  );
};
