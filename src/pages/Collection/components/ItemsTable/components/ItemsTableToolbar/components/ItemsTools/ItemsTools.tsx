import { FC } from 'react';

import { ActionIcon, Button, Group, MultiSelect } from '@mantine/core';
import { IconEdit, IconHash } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { PropsType } from './types';

export const ItemsTools: FC<PropsType> = ({
  selectedTagsProps: { selectedTags, setSelectedTags },
  selectedItemsIds,
  onDeleteItemsClick,
  setEditMode,
  setIsModalOpen,
  tags,
  isOwnerOrAdmin,
}) => {
  const { t } = useTranslation();
  const isDeleteDisabled = selectedItemsIds.length === 0;
  const isEditDisabled = selectedItemsIds.length !== 1;

  return (
    <Group
      spacing="xs"
      position="apart"
      align="flex-start"
      style={{ width: '-webkit-fill-available' }}
    >
      {isOwnerOrAdmin && (
        <Group spacing="xs">
          <ActionIcon
            disabled={isEditDisabled}
            variant="default"
            title={t('button_title_editItem')}
            size={30}
            onClick={() => {
              setEditMode(true);
              setIsModalOpen(true);
            }}
          >
            <IconEdit size={18} />
          </ActionIcon>
          <Button
            variant="filled"
            color="red"
            size="xs"
            disabled={isDeleteDisabled}
            onClick={onDeleteItemsClick}
          >
            {t('button_text_delete')}
          </Button>
        </Group>
      )}
      <MultiSelect
        size="sm"
        onChange={setSelectedTags}
        value={selectedTags}
        icon={<IconHash size={15} />}
        data={tags || []}
        placeholder={t('label_tags')}
        title={t('placeholder_text_filterByTags')}
        searchable
        clearable
        maxDropdownHeight={120}
      />
    </Group>
  );
};
