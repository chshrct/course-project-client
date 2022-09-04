import React, { FC, useEffect, useState } from 'react';

import { Box, Button, Container, Group, Mark, Space, Stack, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ItemCard } from 'pages/Main/LastAddedItems/ItemCard/ItemCard';
import { useLazyGetItemsByTagQuery } from 'shared/api';
import { DEFAULT_PAGE_LIMIT } from 'shared/constants';

export const Tag: FC = () => {
  const { tag } = useParams();
  const { t } = useTranslation();
  const limit = DEFAULT_PAGE_LIMIT;
  const [getItemsByTag, { data, isFetching }] = useLazyGetItemsByTagQuery();
  const [page, setPage] = useState(1);
  const isShowMore = data ? data?.count > page * limit : false;

  const onShowMoreClick = (): void => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (tag) getItemsByTag({ tag, limit, page });
  }, [getItemsByTag, limit, page, tag]);

  return (
    <Container size="xl">
      <Space h="xl" />
      <Stack spacing="md">
        <Title order={4}>
          {`${t('page_title_itemsByTag')}: `}
          <Mark px={4} style={{ borderRadius: '4px' }}>
            {tag}
          </Mark>
        </Title>
        <Group>
          {data?.items.map(itemData => (
            <ItemCard key={itemData.item.id} itemData={itemData} />
          ))}
        </Group>
        {isShowMore && (
          <Box>
            <Button onClick={onShowMoreClick} loading={isFetching}>
              {t('text_spoilerClosed')}
            </Button>
          </Box>
        )}
      </Stack>
    </Container>
  );
};
