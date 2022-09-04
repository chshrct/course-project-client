import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { ActionIcon, Button, Group, MultiSelect, Space } from '@mantine/core';
import { IconEdit, IconHash, IconPlus } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { CSVButton } from './CSVButton/CSVButton';
import { ItemForm } from './ItemForm';

import { useDeleteItemsMutation } from 'shared/api';
import { FieldType } from 'shared/api/collections/types';
import { GetCollectionItemsResponseType } from 'shared/api/items/types';
import { AppModal } from 'shared/components';

type PropsType = {
  id: string;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  selectedItemIds: string[];
  setSelectedItemIds: Dispatch<SetStateAction<string[]>>;
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  collectionItemsData: GetCollectionItemsResponseType;
  itemFields: FieldType[];
  tags: string[];
};

export const ItemsTableToolbar: FC<PropsType> = ({
  id,
  limit,
  page,
  selectedItemIds,
  setSelectedItemIds,
  setPage,
  collectionItemsData,
  itemFields,
  tags,
  selectedTags,
  setSelectedTags,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const isDeleteDisabled = selectedItemIds.length === 0;
  const isEditDisabled = selectedItemIds.length !== 1;
  const { t } = useTranslation();
  const [deleteItems, { isSuccess: isDeleteSuccess, reset: resetDelete }] =
    useDeleteItemsMutation();

  useEffect(() => {
    if (isDeleteSuccess) setSelectedItemIds([]);
  }, [isDeleteSuccess, setSelectedItemIds]);

  useEffect(() => {
    if (isDeleteSuccess && collectionItemsData.items.length === 0 && page > 1) {
      setPage(page => page - 1);
      resetDelete();
    }
  }, [collectionItemsData.items.length, isDeleteSuccess, page, resetDelete, setPage]);

  const onDeleteItemsClick = (): void => {
    deleteItems({ itemIds: selectedItemIds, pageInfo: { id, limit, page } });
  };

  const itemId = editMode ? selectedItemIds[0] : undefined;

  return (
    <Group spacing="xs" ml={-10} align="flex-start" noWrap>
      <Space h="md" />
      <ActionIcon
        variant="default"
        title={t('button_title_addItem')}
        size={30}
        onClick={() => {
          setEditMode(false);
          setIsModalOpen(true);
        }}
      >
        <IconPlus size={18} />
      </ActionIcon>
      <CSVButton collectionId={id} />
      {collectionItemsData.items.length !== 0 && (
        <Group
          spacing="xs"
          position="apart"
          align="flex-start"
          style={{ width: '-webkit-fill-available' }}
        >
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
      )}
      <AppModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        title={itemId ? t('modal_title_editItem') : t('modal_title_addItem')}
      >
        <ItemForm
          itemFields={itemFields}
          collectionId={id}
          setShowForm={setIsModalOpen}
          limit={limit}
          page={page}
          itemId={itemId}
          tags={tags}
        />
      </AppModal>
    </Group>
  );
};
