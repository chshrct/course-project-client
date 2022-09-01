import { ChangeEventHandler, FC, useEffect } from 'react';

import { Divider, Loader, Stack, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';

import { SearchItem } from './SearchResultsList/SearchItem';
import { SearchResultsList } from './SearchResultsList/SearchResultsList';

import { useGetTenLatestItemsQuery, useLazySearchByQueryQuery } from 'shared/api';

const DEBOUNCE_DELAY = 500;

export const Search: FC = () => {
  const { data: tenLatestItemsData, isFetching: isLatestItemsFetching } =
    useGetTenLatestItemsQuery();
  const [query, setQuery] = useDebouncedState('', DEBOUNCE_DELAY);
  const [searchByQuery, { data: searchByQueryData, isFetching: isSearchFetching }] =
    useLazySearchByQueryQuery();

  useEffect(() => {
    if (query) searchByQuery({ query });
  }, [query, searchByQuery]);

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = e =>
    setQuery(e.currentTarget.value);

  const searchIcon =
    isSearchFetching || isLatestItemsFetching ? (
      <Loader color="gray" size="xs" variant="dots" />
    ) : (
      <IconSearch size={20} />
    );

  return (
    <Stack spacing={0}>
      <TextInput onChange={onSearchChange} variant="unstyled" icon={searchIcon} />
      <Divider />

      {!query ? (
        <Stack spacing={0}>
          {tenLatestItemsData?.map(
            ({ item: { id, title }, collection: { title: colTitle } }) => (
              <SearchItem
                key={id}
                id={id}
                mainText={title}
                type="Item"
                secondaryText={colTitle}
              />
            ),
          )}
        </Stack>
      ) : (
        <SearchResultsList searchData={searchByQueryData} />
      )}
    </Stack>
  );
};
