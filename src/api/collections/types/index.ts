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
export type CollectionResponseType = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  owner: { id: string; name: string };
  topics: string[];
  itemFields: FieldType[];
};

export type GetUserCollectionsResponseType = CollectionResponseType[];

export type CreateCollectionRequestType = Omit<CollectionType, 'id'>;

export type CreateCollectionResponseType = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  owner: { id: string; name: string };
  topics: string[];
  itemFields: FieldType[];
};

export type GetTopicsResponseType = string[];

export type DeleteCollectionRequestType = { id: string };

export type UpdateCollectionRequestParamType = { id: string };
export type UpdateCollectionRequestBodyType = {
  owner: string;
  title: string;
  description: string;
  image: string | null;
  topics: string[];
  itemFields: FieldType[];
};
export type UpdateCollectionResponseType = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  owner: { id: string; name: string };
  topics: string[];
  itemFields: FieldType[];
};
