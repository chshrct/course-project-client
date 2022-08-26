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

import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { ItemAdditionalFieldsList } from './ItemAdditionalFieldsList';
import { ItemTagsList } from './ItemTagsList';
import s from './style/Item.module.css';

import { selectColorScheme } from 'app';
import { useLazyGetItemQuery } from 'shared/api';
import { useAppSelector } from 'store';

export const Item: FC = () => {
  const colorScheme = useAppSelector(selectColorScheme);
  const [getItem, { data: itemData, isFetching: isItemFetching }] = useLazyGetItemQuery();
  const { id } = useParams();

  useEffect(() => {
    if (id) getItem({ itemId: id });
  }, [getItem, id]);

  return (
    <Container>
      <LoadingOverlay visible={isItemFetching} overlayBlur={2} />
      <Space h="xl" />
      <Paper shadow="sm" p="xs" className={colorScheme === 'dark' ? s.paperDarkbg : ''}>
        <Stack spacing="md">
          <Text lineClamp={2}>
            <Title order={2} className={s.whitespace}>
              {itemData?.title}
            </Title>
          </Text>
          <ItemTagsList tags={itemData?.tags} />
          <ItemAdditionalFieldsList itemFields={itemData?.itemFields} />
        </Stack>
      </Paper>
      <Space h="xl" />
      <Stack align="center">
        {id && <CommentList item={id} />}
        <CommentInput item={id} />
      </Stack>
    </Container>
  );
};
