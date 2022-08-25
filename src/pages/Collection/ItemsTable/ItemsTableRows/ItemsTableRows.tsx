import { ChangeEventHandler, Dispatch, FC, SetStateAction } from 'react';

import { Checkbox } from '@mantine/core';

import { SortSettingsType } from '../ItemsTable';
import { formatFieldData } from '../utils';

import { filterItems, sortItems } from './utils';

import { GetCollectionItemsResponseType } from 'shared/api/items/types';

type PropsType = {
  collectionItems: GetCollectionItemsResponseType;
  selectedItemIds: string[];
  setSelectedItemIds: Dispatch<SetStateAction<string[]>>;
  limit: number;
  page: number;
  selectedTags: string[];
  sortSettings: SortSettingsType;
};

export const ItemsTableRows: FC<PropsType> = ({
  collectionItems,
  selectedItemIds,
  setSelectedItemIds,
  limit,
  page,
  selectedTags,
  sortSettings,
}) => {
  const filteredItems = filterItems(selectedTags, collectionItems);
  const sortedAndFiltered = sortItems(sortSettings, filteredItems);

  return (
    <>
      {sortedAndFiltered.map(({ id, tags, title, itemFields }, index) => {
        const itemChecked = selectedItemIds.includes(id);
        const itemIndex = limit * (page - 1) + index + 1;

        const onItemChange: ChangeEventHandler<HTMLInputElement> = e =>
          e.currentTarget.checked
            ? setSelectedItemIds(ids => [...ids, id])
            : setSelectedItemIds(ids => ids.filter(userId => userId !== id));

        return (
          <tr key={id}>
            <td>
              <Checkbox size="xs" onChange={onItemChange} checked={itemChecked} />
            </td>
            <td>{itemIndex}</td>
            <td>{id}</td>
            <td>{title}</td>
            {itemFields.length > 0 &&
              itemFields.map(field => (
                <td key={field.title}>{formatFieldData(field.value, field.type)}</td>
              ))}
            <td>{tags.join(', ')}</td>
          </tr>
        );
      })}
    </>
  );
};
