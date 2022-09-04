import { FC } from 'react';

import { Stack } from '@mantine/core';

import { SearchItem } from './SearchItem';

import { SearchByQueryResponse } from 'api/search/types';

type PropsType = {
  searchData: SearchByQueryResponse | undefined;
};

export const SearchResultsList: FC<PropsType> = ({ searchData }) => {
  return (
    <Stack spacing={0}>
      {searchData?.map(({ id, highlight, title, type }) => (
        <SearchItem
          key={`${highlight.score}${id}`}
          id={id}
          mainText={title}
          highlight={highlight}
          type={type}
        />
      ))}
    </Stack>
  );
};
