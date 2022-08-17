export type FieldTypesType = `number` | 'title' | 'text' | 'date' | 'check';

export type FieldType = {
  title: string;
  type: FieldTypesType;
};

export type CollectionType = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  owner: string;
  topics: string[];
  itemFields: FieldType[];
};

export type CreateCollectionRequestBodyType = Omit<CollectionType, 'id'>;

export type CreateCollectionResponseBodyType = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  owner: { id: string; name: string };
  topics: string[];
  itemFields: FieldType[];
};

export type GetUserCollectionsResponseBodyType = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  owner: { id: string; name: string };
  topics: string[];
  itemFields: FieldType[];
}[];

export type UpdateCollectionRequestParamType = { id: string };
export type UpdateCollectionRequestBodyType = {
  owner: string;
  title: string;
  description: string;
  image: string | null;
  topics: string[];
  itemFields: FieldType[];
};
