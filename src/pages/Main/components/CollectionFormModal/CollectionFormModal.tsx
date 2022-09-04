import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { PropsType } from './types';

import { AppModal, CollectionForm } from 'components';

export const CollectionFormModal: FC<PropsType> = ({
  collectionForEdit,
  setIsModalOpen,
  isModalOpen,
}) => {
  const { t } = useTranslation();
  const modalTitle = collectionForEdit
    ? t('modal_title_editCollection')
    : t('modal_title_createCollection');

  return (
    <AppModal title={modalTitle} setOpenModal={setIsModalOpen} openModal={isModalOpen}>
      <CollectionForm setShowForm={setIsModalOpen} collection={collectionForEdit} />
    </AppModal>
  );
};
