import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { ActionIcon, Button, Group, Space } from '@mantine/core';
import { IconEdit, IconPlus } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { ItemFormModal } from './ItemFormModal';

import { useDeleteItemsMutation } from 'shared/api';
import { FieldType } from 'shared/api/collections/types';
import { GetCollectionItemsResponseType } from 'shared/api/items/types';

type PropsType = {
  id: string;
  selectedItemIds: string[];
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setSelectedItemIds: Dispatch<SetStateAction<string[]>>;
  collectionItemsData: GetCollectionItemsResponseType;
  itemFields: FieldType[];
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
}) => {
  const [showForm, setShowForm] = useState(false);
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

  return (
    <Group spacing="xs" ml={-10}>
      <Space h="md" />
      <ActionIcon
        variant="default"
        title={t('button_title_addItem')}
        size={30}
        onClick={() => {
          setEditMode(false);
          setShowForm(true);
        }}
      >
        <IconPlus size={18} />
      </ActionIcon>
      {collectionItemsData.items.length !== 0 && (
        <>
          <ActionIcon
            disabled={isEditDisabled}
            variant="default"
            title={t('button_title_editItem')}
            size={30}
            onClick={() => {
              setEditMode(true);
              setShowForm(true);
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
        </>
      )}
      <ItemFormModal
        collectionId={id}
        itemId={editMode ? selectedItemIds[0] : undefined}
        showForm={showForm}
        setShowForm={setShowForm}
        itemFields={itemFields}
        limit={limit}
        page={page}
      />
    </Group>
  );
};
