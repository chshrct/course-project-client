import { CollectionType, FieldType } from 'shared/api/collections/types';

export type PropsType = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  owner: { id: string; name: string };
  topics: string[];
  itemFields: FieldType[];
  setCollectionForEdit: (col: CollectionType) => void;
  setShowForm: (show: boolean) => void;
};
