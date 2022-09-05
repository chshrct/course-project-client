import { FC, useEffect } from 'react';

import {
  Container,
  LoadingOverlay,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useParams } from 'react-router-dom';

import {
  CommentInput,
  CommentList,
  ItemAdditionalFieldsList,
  ItemTagsList,
  LikeInfo,
} from './components';
import s from './style/Item.module.css';

import { useLazyGetItemQuery } from 'api';
import { selectColorScheme, selectIsSignedIn } from 'app';
import { useAppSelector } from 'store';

export const Item: FC = () => {
  const colorScheme = useAppSelector(selectColorScheme);
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const [getItem, { data: itemData, isFetching: isItemFetching }] = useLazyGetItemQuery();
  const { id: itemId } = useParams();

  useEffect(() => {
    if (itemId) getItem({ itemId });
  }, [getItem, itemId]);

  if (!itemId) return null;

  return (
    <Container size="xl">
      <LoadingOverlay visible={isItemFetching} overlayBlur={2} />
      <Space h="xl" />
      {itemData && (
        <Paper shadow="sm" p="xs" className={colorScheme === 'dark' ? s.paperDarkbg : ''}>
          <Stack spacing="md">
            <Text lineClamp={2}>
              <Title order={2} className={s.whitespace}>
                {itemData.title}
              </Title>
            </Text>
            <ItemTagsList tags={itemData.tags} />
            <LikeInfo item={itemId} />
            <ItemAdditionalFieldsList itemFields={itemData.itemFields} />
          </Stack>
        </Paper>
      )}
      <Space h="xl" />
      <Stack align="flex-start">
        <CommentList itemId={itemId} />
        {isSignedIn && <CommentInput itemId={itemId} />}
      </Stack>
      <Space h="md" />
    </Container>
  );
};
