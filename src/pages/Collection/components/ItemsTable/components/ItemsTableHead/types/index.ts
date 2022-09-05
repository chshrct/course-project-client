import { Dispatch, SetStateAction } from 'react';

import { SortSettingsType } from '../../../types';

import { FieldType, GetCollectionItemsResponseType } from 'api';

export type PropsType = {
  isOwnerOrAdmin: boolean;
  itemFields: FieldType[];
  collectionItemsData: GetCollectionItemsResponseType;
  selectedItemsProps: {
    selectedItemsIds: string[];
    setSelectedItemsIds: Dispatch<SetStateAction<string[]>>;
  };
  sortSettingsProps: {
    sortSettings: SortSettingsType;
    setSortSettings: Dispatch<SetStateAction<SortSettingsType>>;
  };
};
