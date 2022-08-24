import { Dispatch, FC, SetStateAction } from 'react';

import { Group, Pagination, Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { GetCollectionItemsResponseType } from 'shared/api/items/types';
import { PAGE_LIMIT_SELECT_DATA } from 'shared/constants';

type PropsType = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  collectionItemsData: GetCollectionItemsResponseType;
};

export const ItemsPagination: FC<PropsType> = ({
  page,
  setPage,
  limit,
  setLimit,
  collectionItemsData,
}) => {
  const { t } = useTranslation();
  const { count, items } = collectionItemsData;
  const total = count ? Math.ceil(count / limit) : 1;

  const onLimitChange = (value: string): void => {
    setLimit(Number(value));
    setPage(1);
  };

  if (items.length === 0) return null;

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
