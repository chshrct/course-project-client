import React, { FC, useEffect, useState } from 'react';

import { Box, Button, Container, Group, Mark, Space, Stack, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useLazyGetItemsByTagQuery } from 'api';
import { DEFAULT_PAGE_LIMIT } from 'constant';
import { ItemCard } from 'pages/Main/components/LastAddedItems/ItemCard/ItemCard';

export const Tag: FC = () => {
  const { tag } = useParams();
  const { t } = useTranslation();
  const limit = DEFAULT_PAGE_LIMIT;
  const [getItemsByTag, { data: itemsData, isFetching: isItemsDataFetching }] =
    useLazyGetItemsByTagQuery();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (tag) getItemsByTag({ tag, limit, page });
  }, [getItemsByTag, limit, page, tag]);

  if (!itemsData) return null;

  const canShowMore = itemsData.count > page * limit;

  const onShowMoreClick = (): void => {
    setPage(page => page + 1);
  };

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
          {itemsData.items.map(itemData => (
            <ItemCard key={itemData.item.id} itemData={itemData} />
          ))}
        </Group>
        {canShowMore && (
          <Box>
            <Button onClick={onShowMoreClick} loading={isItemsDataFetching}>
              {t('text_spoilerClosed')}
            </Button>
          </Box>
        )}
      </Stack>
    </Container>
  );
};
