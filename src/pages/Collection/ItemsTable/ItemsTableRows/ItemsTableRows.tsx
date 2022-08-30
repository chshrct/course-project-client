import { ChangeEventHandler, Dispatch, FC, SetStateAction } from 'react';

import { Box, Checkbox, Group, UnstyledButton } from '@mantine/core';
import { IconAlbum, IconChevronRight } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

import { FieldDataPicker } from '../FieldDataPicker';
import { SortSettingsType } from '../ItemsTable';

import { filterItems, sortItems } from './utils';

import { APP_ROUTES } from 'routes/enums';
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
  const navigate = useNavigate();

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
            <td>
              <UnstyledButton onClick={() => navigate(`${APP_ROUTES.ITEM}/${id}`)}>
                <Group noWrap align="center" spacing={2}>
                  {title}
                  <Box style={{ height: '16px' }}>
                    <IconAlbum size={16} stroke={1.5} />
                  </Box>
                  <Box>
                    <IconChevronRight size={12} stroke={1.5} />
                  </Box>
                </Group>
              </UnstyledButton>
            </td>
            {itemFields.length > 0 &&
              itemFields.map(field => (
                <td key={field.title}>
                  <FieldDataPicker type={field.type} value={field.value} />
                </td>
              ))}
            <td>{tags.join(', ')}</td>
          </tr>
        );
      })}
    </>
  );
};
