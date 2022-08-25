import { ChangeEventHandler, Dispatch, FC, SetStateAction } from 'react';

import { Checkbox } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { SortSettingsType } from '../ItemsTable';

import { SortButton } from './SortButton';

import { FieldType } from 'shared/api/collections/types';
import { GetCollectionItemsResponseType } from 'shared/api/items/types';

type PropsType = {
  itemFields: FieldType[];
  collectionItemsData: GetCollectionItemsResponseType;
  selectedItemIds: string[];
  setSelectedItemIds: Dispatch<SetStateAction<string[]>>;
  sortSettings: SortSettingsType;
  setSortSettings: Dispatch<SetStateAction<SortSettingsType>>;
};

export const ItemsTableHead: FC<PropsType> = ({
  itemFields,
  collectionItemsData,
  selectedItemIds,
  setSelectedItemIds,
  sortSettings,
  setSortSettings,
}) => {
  const { t } = useTranslation();

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
      <th>
        <SortButton
          sortSettings={sortSettings}
          setSortSettings={setSortSettings}
          fieldTitle="title"
          fieldType="text"
        />
      </th>

      {itemFields.map(field => (
        <th key={field.title}>
          <SortButton
            sortSettings={sortSettings}
            setSortSettings={setSortSettings}
            fieldTitle={field.title}
            fieldType={field.type}
          />
        </th>
      ))}

      <th>{t('label_tags')}</th>
    </tr>
  );
};
