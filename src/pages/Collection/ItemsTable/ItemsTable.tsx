import { ChangeEventHandler, FC, useState } from 'react';

import { Checkbox, Stack, Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { ItemsPagination } from './ItemsPagination';
import { ItemsTableRows } from './ItemsTableRows';
import { ItemsTableToolbar } from './ItemsTableToolbar';

import { useGetCollectionItemsQuery } from 'shared/api';
import { FieldType } from 'shared/api/collections/types';
import { DEFAULT_PAGE_LIMIT } from 'shared/constants';

type PropsType = {
  id: string;
  itemFields: FieldType[];
};

export const ItemsTable: FC<PropsType> = ({ id, itemFields }) => {
  const { t } = useTranslation();
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [page, setPage] = useState(1);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const { data: collectionItemsData } = useGetCollectionItemsQuery(
    { id, limit, page },
    { refetchOnMountOrArgChange: true },
  );

  if (!collectionItemsData) return null;

  const allItemsSelected = collectionItemsData.items.every(items =>
    selectedItemIds.includes(items.id),
  );
  const onItemsChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (e.currentTarget.checked) {
      setSelectedItemIds(collectionItemsData.items.map(item => item.id));

      return;
    }
    setSelectedItemIds(
      selectedItemIds.filter(id =>
        collectionItemsData.items.every(item => item.id !== id),
      ),
    );
  };

  return (
    <Stack spacing="xs">
      <ItemsTableToolbar
        itemFields={itemFields}
        collectionItemsData={collectionItemsData}
        setPage={setPage}
        id={id}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
        limit={limit}
        page={page}
      />
      {collectionItemsData.items.length !== 0 && (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>
                <Checkbox
                  size="xs"
                  onChange={onItemsChange}
                  checked={allItemsSelected}
                  title={t('button_title_toggleAll')}
                />
              </th>

              <th>#</th>
              <th>Id</th>
              <th>{t('label_title')}</th>

              {itemFields.map(field => (
                <th key={field.title}>{field.title}</th>
              ))}

              <th>{t('label_tags')}</th>
            </tr>
          </thead>
          <tbody>
            <ItemsTableRows
              collectionItems={collectionItemsData}
              limit={limit}
              page={page}
              selectedItemIds={selectedItemIds}
              setSelectedItemIds={setSelectedItemIds}
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
