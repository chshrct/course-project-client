import { FC, useEffect } from 'react';

import { Button } from '@mantine/core';
import { CSVLink } from 'react-csv';

import { prepareDataForCSV } from './utils';

import { selectColorScheme } from 'app';
import { useLazyGetCollectionItemsQuery } from 'shared/api';
import { useAppSelector } from 'store';

type PropsType = {
  collectionId: string;
};

export const CSVButton: FC<PropsType> = ({ collectionId }) => {
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
          Download CSV
        </Button>
      </CSVLink>
    </span>
  );
};
