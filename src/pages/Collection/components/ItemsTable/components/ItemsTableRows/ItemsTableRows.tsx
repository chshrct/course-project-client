import { ChangeEventHandler, FC } from 'react';

import { Box, Checkbox, Group, UnstyledButton } from '@mantine/core';
import { IconAlbum, IconChevronRight } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

import { FieldDataPicker } from './components';
import { PropsType } from './types';
import { filterItems, sortItems } from './utils';

import { APP_ROUTES } from 'routes';

export const ItemsTableRows: FC<PropsType> = ({
  collectionItems,
  selectedItemsProps: { selectedItemsIds, setSelectedItemsIds },
  paginationProps: { limit, page },
  selectedTags,
  sortSettings,
  isOwnerOrAdmin,
}) => {
  const filteredItems = filterItems(selectedTags, collectionItems);
  const sortedAndFiltered = sortItems(sortSettings, filteredItems);
  const navigate = useNavigate();

  return (
    <>
      {sortedAndFiltered.map(({ id, tags, title, itemFields }, index) => {
        const itemChecked = selectedItemsIds.includes(id);
        const itemIndex = limit * (page - 1) + index + 1;
        const tableTags = tags.join(', ');
        const isItemFields = itemFields.length > 0;

        const onItemChange: ChangeEventHandler<HTMLInputElement> = e =>
          e.currentTarget.checked
            ? setSelectedItemsIds(ids => [...ids, id])
            : setSelectedItemsIds(ids => ids.filter(userId => userId !== id));

        const onItemTitleClick = (): void => navigate(`${APP_ROUTES.ITEM}/${id}`);

        return (
          <tr key={id}>
            {isOwnerOrAdmin && (
              <td>
                <Checkbox size="xs" onChange={onItemChange} checked={itemChecked} />
              </td>
            )}
            <td>{itemIndex}</td>
            <td>{id}</td>
            <td>
              <UnstyledButton onClick={onItemTitleClick}>
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
            {isItemFields &&
              itemFields.map(({ title, type, value }) => (
                <td key={title}>
                  <FieldDataPicker type={type} value={value} />
                </td>
              ))}
            <td>{tableTags}</td>
          </tr>
        );
      })}
    </>
  );
};
