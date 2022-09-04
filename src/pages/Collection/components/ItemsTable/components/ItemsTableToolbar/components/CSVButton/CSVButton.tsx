import { FC, useEffect } from 'react';

import { Button } from '@mantine/core';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';

import { PropsType } from './types';
import { prepareDataForCSV } from './utils';

import { useLazyGetCollectionItemsQuery } from 'api';
import { selectColorScheme } from 'app';
import { useAppSelector } from 'store';

export const CSVButton: FC<PropsType> = ({ collectionId }) => {
  const { t } = useTranslation();
  const colorScheme = useAppSelector(selectColorScheme);

  const [getCollectionItems, { data, isSuccess }] = useLazyGetCollectionItemsQuery();

  useEffect(() => {
    getCollectionItems({ id: collectionId, limit: 0, page: 1 });
  }, [collectionId, getCollectionItems]);

  return (
    <span style={{ pointerEvents: isSuccess ? 'auto' : 'none' }}>
      <CSVLink data={prepareDataForCSV(data)} filename="collection.csv">
        <Button
          variant="default"
          color={colorScheme === 'dark' ? 'gray' : 'dark'}
          size="xs"
          p={5}
        >
          {`${t('button_text_download')} CSV`}
        </Button>
      </CSVLink>
    </span>
  );
};
