import { FC, useState } from 'react';

import { Stack, Table } from '@mantine/core';

import { ItemsPagination } from './ItemsPagination';
import { ItemsTableHead } from './ItemsTableHead';
import { ItemsTableRows } from './ItemsTableRows';
import { ItemsTableToolbar } from './ItemsTableToolbar';

import { useGetCollectionItemsQuery, useGetTagsQuery } from 'shared/api';
import { FieldType, FieldTypesType } from 'shared/api/collections/types';
import { DEFAULT_PAGE_LIMIT } from 'shared/constants';

type PropsType = {
  id: string;
  itemFields: FieldType[];
};

export type SortSettingsType = {
  title: string;
  type: FieldTypesType;
  direction: 'up' | 'down';
};

export const ItemsTable: FC<PropsType> = ({ id, itemFields }) => {
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [page, setPage] = useState(1);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortSettings, setSortSettings] = useState<SortSettingsType>({
    title: '',
    type: 'text',
    direction: 'up',
  });
  const { data: tagsData } = useGetTagsQuery();

  const { data: collectionItemsData } = useGetCollectionItemsQuery(
    { id, limit, page },
    { refetchOnMountOrArgChange: true },
  );

  if (!collectionItemsData) return null;

  return (
    <Stack spacing="xs">
      <ItemsTableToolbar
        itemFields={itemFields}
        collectionItemsData={collectionItemsData}
        setPage={setPage}
        id={id}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        limit={limit}
        page={page}
        tags={tagsData || []}
      />
      {collectionItemsData.items.length !== 0 && (
        <Table striped highlightOnHover>
          <thead>
            <ItemsTableHead
              itemFields={itemFields}
              collectionItemsData={collectionItemsData}
              selectedItemIds={selectedItemIds}
              setSelectedItemIds={setSelectedItemIds}
              sortSettings={sortSettings}
              setSortSettings={setSortSettings}
            />
          </thead>
          <tbody>
            <ItemsTableRows
              collectionItems={collectionItemsData}
              limit={limit}
              page={page}
              selectedItemIds={selectedItemIds}
              setSelectedItemIds={setSelectedItemIds}
              selectedTags={selectedTags}
              sortSettings={sortSettings}
            />
          </tbody>
        </Table>
      )}
      <ItemsPagination
        collectionItemsData={collectionItemsData}
        limit={limit}
        page={page}
        setLimit={setLimit}
        setPage={setPage}
      />
    </Stack>
  );
};
