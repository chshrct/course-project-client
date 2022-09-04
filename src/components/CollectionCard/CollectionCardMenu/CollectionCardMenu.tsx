import { FC, MouseEventHandler } from 'react';

import { ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import { useDeleteCollectionMutation } from 'api';
import { CollectionResponseType, CollectionType } from 'api/collections/types';

type PropsType = {
  setCollectionForEdit: (col: CollectionType) => void;
  setShowForm: (show: boolean) => void;
  collection: CollectionResponseType;
};

export const CollectionCardMenu: FC<PropsType> = ({
  setCollectionForEdit,
  setShowForm,
  collection,
}) => {
  const { t } = useTranslation();
  const [deleteCollection] = useDeleteCollectionMutation();
  const {
    id,
    owner: { id: ownerId },
  } = collection;

  const onDeleteCollectionClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();
    deleteCollection({ id, userId: ownerId });
  };

  const onEditCollectionClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();
    setShowForm(true);
    setCollectionForEdit({
      ...collection,
      owner: ownerId,
    });
  };

  const stopPropagationHandler: MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = e => {
    e.stopPropagation();
  };

  return (
    <Menu withinPortal position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon title={t('title_collectionMenu')} onClick={stopPropagationHandler}>
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconEdit size={14} />} onClick={onEditCollectionClick}>
          {t('menu_item_text_edit')}
        </Menu.Item>
        <Menu.Item
          icon={<IconTrash size={14} />}
          color="red"
          onClick={onDeleteCollectionClick}
        >
          {t('menu_item_text_delete')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
