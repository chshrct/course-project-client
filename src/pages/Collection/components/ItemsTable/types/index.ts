import { FieldType, FieldTypesType } from 'api/collections/types';

export type PropsType = {
  collectionData: {
    collectionId: string;
    itemFields: FieldType[];
    owner: string;
  };
};

export type SortSettingsType = {
  title: string;
  type: FieldTypesType;
  direction: 'up' | 'down';
};
