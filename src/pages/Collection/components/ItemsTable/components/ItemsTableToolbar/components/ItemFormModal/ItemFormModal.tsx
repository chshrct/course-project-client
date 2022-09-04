import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { ItemForm } from '../ItemForm';

import { PropsType } from './types';

import { AppModal } from 'components';

export const ItemFormModal: FC<PropsType> = ({
  isModalOpen,
  setIsModalOpen,
  itemProps,
}) => {
  const { t } = useTranslation();
  const { itemId } = itemProps;

  return (
    <AppModal
      openModal={isModalOpen}
      setOpenModal={setIsModalOpen}
      title={itemId ? t('modal_title_editItem') : t('modal_title_addItem')}
    >
      <ItemForm setShowForm={setIsModalOpen} itemProps={itemProps} />
    </AppModal>
  );
};
