import React, { FC } from 'react';

import { Stack } from '@mantine/core';

import { CommentCard } from './CommentCard';

import { useGetCommentsQuery } from 'shared/api';

type PropsType = {
  item: string;
};

export const CommentList: FC<PropsType> = ({ item }) => {
  const { data: comments } = useGetCommentsQuery(
    { id: item },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <Stack spacing="xs" style={{ width: '100%' }} align="flex-start">
      {comments?.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};
