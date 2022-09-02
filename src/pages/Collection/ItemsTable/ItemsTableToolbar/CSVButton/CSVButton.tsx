import React, { FC } from 'react';

import { Button } from '@mantine/core';
import { CSVLink } from 'react-csv';

import { selectColorScheme } from 'app';
import { useAppSelector } from 'store';

export const CSVButton: FC = () => {
  const colorScheme = useAppSelector(selectColorScheme);

  return (
    <CSVLink data="data" filename="collection.csv">
      <Button
        variant="default"
        color={colorScheme === 'dark' ? 'gray' : 'dark'}
        size="xs"
        p={5}
      >
        Download CSV
      </Button>
    </CSVLink>
  );
};
