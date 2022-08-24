import React, { Dispatch, FC, SetStateAction } from 'react';

import { Modal } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { CollectionForm } from './CollectionForm';

import { CollectionType } from 'shared/api/collections/types';

type PropsType = {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  collectionForEdit: CollectionType | null;
};

export const CollectionFormModal: FC<PropsType> = ({
  setShowForm,
  showForm,
  collectionForEdit,
}) => {
  const { t } = useTranslation();

  const onModalClose = (): void => setShowForm(false);

  return (
    <Modal
      opened={showForm}
      onClose={onModalClose}
      title={
        collectionForEdit
          ? t('modal_title_editCollection')
          : t('modal_title_createCollection')
      }
      centered
    >
      <CollectionForm setShowForm={setShowForm} collection={collectionForEdit} />
    </Modal>
  );
};
