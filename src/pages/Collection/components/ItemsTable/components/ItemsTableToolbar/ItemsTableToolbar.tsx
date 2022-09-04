import { FC, useState } from 'react';

import { ActionIcon, Group, Space } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { CSVButton, ItemFormModal, ItemsTools } from './components';
import { useSuccessDelete } from './hooks';
import { PropsType } from './types';

import { useDeleteItemsMutation } from 'api';

export const ItemsTableToolbar: FC<PropsType> = ({
  collectionData,
  paginationProps,
  setPage,
  selectedItemsProps: { selectedItemsIds, setSelectedItemsIds },
  selectedTagsProps,
  collectionItemsData,
  tags,
}) => {
  const { collectionId } = collectionData;
  const { limit, page } = paginationProps;
  const isCollectionEmpty = collectionItemsData.items.length === 0;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModeEdit, setIsModeEdit] = useState(false);

  const [deleteItems, { isSuccess: isDeleteSuccess, reset: resetDelete }] =
    useDeleteItemsMutation();

  useSuccessDelete({
    isCollectionEmpty,
    isDeleteSuccess,
    page,
    resetDelete,
    setPage,
    setSelectedItemsIds,
  });

  const deleteItemsHandler = (): void => {
    deleteItems({
      itemIds: selectedItemsIds,
      pageInfo: { id: collectionId, limit, page },
    });
  };

  const itemId = isModeEdit ? selectedItemsIds[0] : undefined;

  const itemProps = {
    itemId,
    collectionData,
    paginationProps,
    tags,
  };

  return (
    <Group spacing="xs" ml={-10} align="flex-start" noWrap>
      <Space h="md" />
      <ActionIcon
        variant="default"
        title={t('button_title_addItem')}
        size={30}
        onClick={() => {
          setIsModeEdit(false);
          setIsModalOpen(true);
        }}
      >
        <IconPlus size={18} />
      </ActionIcon>
      <CSVButton collectionId={collectionId} />
      {!isCollectionEmpty && (
        <ItemsTools
          tags={tags}
          selectedTagsProps={selectedTagsProps}
          selectedItemsIds={selectedItemsIds}
          setEditMode={setIsModeEdit}
          setIsModalOpen={setIsModalOpen}
          onDeleteItemsClick={deleteItemsHandler}
        />
      )}
      <ItemFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        itemProps={itemProps}
      />
    </Group>
  );
};
