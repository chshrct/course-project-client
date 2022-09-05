import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  isOwnerOrAdmin: boolean;
  selectedTagsProps: {
    selectedTags: string[];
    setSelectedTags: Dispatch<SetStateAction<string[]>>;
  };
  selectedItemsIds: string[];
  onDeleteItemsClick: () => void;
  tags: string[];
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
