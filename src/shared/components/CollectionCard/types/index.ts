import { CollectionResponseType, CollectionType } from 'shared/api/collections/types';

export type PropsType = {
  collection: CollectionResponseType;
  setCollectionForEdit: (col: CollectionType) => void;
  setShowForm: (show: boolean) => void;
};
