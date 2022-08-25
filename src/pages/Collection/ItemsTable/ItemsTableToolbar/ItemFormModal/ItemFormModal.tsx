import React, { Dispatch, FC, SetStateAction } from 'react';

import { Modal } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { ItemForm } from './ItemForm';

import { FieldType } from 'shared/api/collections/types';

type PropsType = {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  itemFields: FieldType[];
  collectionId: string;
  limit: number;
  page: number;
  itemId: string | undefined;
  tags: string[];
};

export const ItemFormModal: FC<PropsType> = ({
  setShowForm,
  showForm,
  itemFields,
  collectionId,
  limit,
  page,
  itemId,
  tags,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      opened={showForm}
      onClose={() => {
        setShowForm(false);
      }}
      title={itemId ? t('modal_title_editItem') : t('modal_title_addItem')}
      centered
    >
      <ItemForm
        itemFields={itemFields}
        collectionId={collectionId}
        setShowForm={setShowForm}
        limit={limit}
        page={page}
        itemId={itemId}
        tags={tags}
      />
    </Modal>
  );
};
