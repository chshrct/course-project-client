import { FC, useState } from 'react';

import { Box, Stack, Table } from '@mantine/core';

import {
  ItemsPagination,
  ItemsTableHead,
  ItemsTableRows,
  ItemsTableToolbar,
} from './components';
import { initialSortSetting } from './constant';
import s from './style/ItemsTable.module.css';
import { PropsType, SortSettingsType } from './types';

import { useGetCollectionItemsQuery, useGetTagsQuery } from 'api';
import { DEFAULT_PAGE_LIMIT } from 'constant';

export const ItemsTable: FC<PropsType> = ({ collectionData }) => {
  const { collectionId, itemFields } = collectionData;
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [page, setPage] = useState(1);
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortSettings, setSortSettings] = useState<SortSettingsType>(initialSortSetting);

  const { data: tagsData } = useGetTagsQuery();
  const { data: collectionItemsData } = useGetCollectionItemsQuery(
    { id: collectionId, limit, page },
    { refetchOnMountOrArgChange: true },
  );

  const tags = tagsData?.map(tag => tag.value) || [];

  if (!collectionItemsData) return null;

  const paginationProps = { limit, page };
  const selectedItemsProps = { selectedItemsIds, setSelectedItemsIds };
  const selectedTagsProps = { selectedTags, setSelectedTags };
  const sortSettingsProps = { sortSettings, setSortSettings };

  return (
    <Stack spacing="xs">
      <ItemsTableToolbar
        collectionData={collectionData}
        collectionItemsData={collectionItemsData}
        selectedTagsProps={selectedTagsProps}
        selectedItemsProps={selectedItemsProps}
        paginationProps={paginationProps}
        setPage={setPage}
        tags={tags}
      />
      {collectionItemsData.items.length !== 0 && (
        <Box className={s.tableOverflow}>
          <Table striped highlightOnHover>
            <thead>
              <ItemsTableHead
                itemFields={itemFields}
                collectionItemsData={collectionItemsData}
                selectedItemsProps={selectedItemsProps}
                sortSettingsProps={sortSettingsProps}
              />
            </thead>
            <tbody>
              <ItemsTableRows
                collectionItems={collectionItemsData}
                paginationProps={paginationProps}
                selectedItemsProps={selectedItemsProps}
                selectedTags={selectedTags}
                sortSettings={sortSettings}
              />
            </tbody>
          </Table>
        </Box>
      )}
      <ItemsPagination
        collectionItems={collectionItemsData}
        paginationProps={paginationProps}
        setPage={setPage}
        setLimit={setLimit}
      />
    </Stack>
  );
};
