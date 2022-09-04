import { FC } from 'react';

import { Group, Pagination, Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { PropsType } from './types';

import { PAGE_LIMIT_SELECT_DATA } from 'constant';

export const ItemsPagination: FC<PropsType> = ({
  paginationProps: { limit, page },
  setPage,
  setLimit,
  collectionItems,
}) => {
  const { t } = useTranslation();
  const { count, items } = collectionItems;
  const total = count ? Math.ceil(count / limit) : 1;
  const isNoItems = items.length === 0;

  if (isNoItems) return null;

  const onLimitChange = (value: string): void => {
    setLimit(Number(value));
    setPage(1);
  };

  return (
    <Group position="apart">
      {total > 1 && (
        <Pagination
          title={t('button_title_choosePage')}
          total={total}
          size="sm"
          page={page}
          onChange={setPage}
          siblings={1}
        />
      )}
      <Select
        title={t('button_title_pageSize')}
        size="xs"
        style={{ width: '70px' }}
        value={String(limit)}
        onChange={onLimitChange}
        data={PAGE_LIMIT_SELECT_DATA}
      />
    </Group>
  );
};
