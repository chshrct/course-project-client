import { Dispatch, SetStateAction } from 'react';

import { FieldType, GetCollectionItemsResponseType } from 'api';

export type PropsType = {
  collectionData: {
    collectionId: string;
    itemFields: FieldType[];
  };
  paginationProps: {
    limit: number;
    page: number;
  };
  setPage: Dispatch<SetStateAction<number>>;
  selectedItemsProps: {
    selectedItemsIds: string[];
    setSelectedItemsIds: Dispatch<SetStateAction<string[]>>;
  };
  selectedTagsProps: {
    selectedTags: string[];
    setSelectedTags: Dispatch<SetStateAction<string[]>>;
  };
  collectionItemsData: GetCollectionItemsResponseType;
  tags: string[];
};

export type UseSuccessDeleteArgType = {
  isCollectionEmpty: boolean;
  isDeleteSuccess: boolean;
  page: number;
  resetDelete: () => void;
  setPage: Dispatch<SetStateAction<number>>;
  setSelectedItemsIds: Dispatch<SetStateAction<string[]>>;
};
