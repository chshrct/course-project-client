import React, { FC } from 'react';

import { Group, Pagination, Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { PropsType } from './types';

export const UsersTablePagination: FC<PropsType> = ({
  onLimitChange,
  pageProps: { limit, page },
  pagesTotal,
  setPage,
}) => {
  const { t } = useTranslation();

  return (
    <Group position="apart">
      {pagesTotal > 1 && (
        <Pagination
          title={t('button_title_choosePage')}
          total={pagesTotal}
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
        data={[
          { value: '1', label: '1' },
          { value: '5', label: '5' },
          { value: '10', label: '10' },
          { value: '20', label: '20' },
        ]}
      />
    </Group>
  );
};
