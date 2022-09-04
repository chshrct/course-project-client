import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { PropsType } from './types';

import { AppModal, CollectionForm } from 'components';

export const CollectionFormModal: FC<PropsType> = ({
  collectionForEdit,
  setOpenModal,
  openModal,
}) => {
  const { t } = useTranslation();

  return (
    <AppModal
      title={
        collectionForEdit
          ? t('modal_title_editCollection')
          : t('modal_title_createCollection')
      }
      setOpenModal={setOpenModal}
      openModal={openModal}
    >
      <CollectionForm setShowForm={setOpenModal} collection={collectionForEdit} />
    </AppModal>
  );
};
