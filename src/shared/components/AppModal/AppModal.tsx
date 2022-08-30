import { Dispatch, FC, ReactElement, ReactNode, SetStateAction } from 'react';

import { Modal } from '@mantine/core';

type PropsType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
  title: ReactNode;
};

export const AppModal: FC<PropsType> = ({ setOpenModal, openModal, children, title }) => {
  const onModalClose = (): void => setOpenModal(false);

  return (
    <Modal opened={openModal} onClose={onModalClose} title={title} centered>
      {children}
    </Modal>
  );
};
