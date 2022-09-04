import { FC } from 'react';

import { Modal } from '@mantine/core';

import { Search } from './Search';

import { selectIsSearchOpen, toggleIsSearchOpen } from 'app';
import { useAppDispatch, useAppSelector } from 'store';

export const SearchModal: FC = () => {
  const dispatch = useAppDispatch();
  const isSearchOpen = useAppSelector(selectIsSearchOpen);

  return (
    <Modal
      size="xl"
      withCloseButton={false}
      opened={isSearchOpen}
      onClose={() => {
        dispatch(toggleIsSearchOpen());
      }}
      padding={0}
      styles={{
        modal: {
          maxWidth: '100%',
        },
      }}
    >
      <Search />
    </Modal>
  );
};
