import React, { FC } from 'react';

import { Stack } from '@mantine/core';

import { CommentCard } from './components';
import { PropsType } from './types';

import { useGetCommentsQuery } from 'api';

export const CommentList: FC<PropsType> = ({ itemId }) => {
  const { data: comments } = useGetCommentsQuery(
    { id: itemId },
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
